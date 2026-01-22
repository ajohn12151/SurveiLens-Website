import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { config } from "@/lib/config";

const leadSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    org: z.string().min(1, "Organization is required"),
    role: z.string().optional(),
    message: z.string().optional(),
    lead_type: z.enum(["early_access", "walkthrough_request"]).default("early_access"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate Input
        const validatedData = leadSchema.parse(body);

        if (!config.supabase.url || !config.supabase.serviceRoleKey) {
            console.warn("Supabase credentials missing. Mocking success response.");
            console.log("Mock Lead Submission:", validatedData);
            return NextResponse.json({ success: true, mock: true });
        }

        // Server-side Supabase client (promoted permissions for Insert)
        const supabaseAdmin = createClient(
            config.supabase.url,
            config.supabase.serviceRoleKey
        );

        const { error } = await supabaseAdmin
            .from("early_access_leads")
            .insert([validatedData]);

        if (error) {
            console.error("Supabase Error:", error);
            return NextResponse.json({ error: "Storage Failed" }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: "Validation Failed", details: (err as any).errors }, { status: 400 });
        }
        console.error("API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
