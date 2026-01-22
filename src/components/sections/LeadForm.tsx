"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    org: z.string().min(1, "Organization is required"),
    role: z.string().optional(),
    message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const LeadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            setIsSuccess(true);
            reset();
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-white/5 border border-surveilens-blue/30 rounded-2xl text-center animate-fade-in">
                <CheckCircle2 className="h-16 w-16 text-surveilens-blue mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">You're on the list.</h3>
                <p className="text-zinc-400">
                    Thanks for your interest. We'll be in touch shortly with early access details.
                </p>
                <Button
                    className="mt-6"
                    variant="ghost"
                    onClick={() => setIsSuccess(false)}
                >
                    Send another
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Name</label>
                    <Input
                        placeholder="Jane Doe"
                        {...register("name")}
                        className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Work Email</label>
                    <Input
                        type="email"
                        placeholder="jane@school.edu"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Organization</label>
                    <Input
                        placeholder="Lincoln High School"
                        {...register("org")}
                        className={errors.org ? "border-red-500" : ""}

                    />
                    {errors.org && <p className="text-xs text-red-500">{errors.org.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Role (Optional)</label>
                    <Input placeholder="Director of Safety" {...register("role")} />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Message (Optional)</label>
                <Textarea
                    placeholder="Tell us about your current camera setup..."
                    {...register("message")}
                    rows={4}
                />
            </div>

            {error && (
                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    {error}
                </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining...
                    </>
                ) : "Join Early Access"}
            </Button>

            <p className="text-xs text-center text-zinc-500 mt-4">
                By joining, you agree to our <a href="/legal/terms" className="underline hover:text-zinc-300">Terms</a> and <a href="/legal/privacy" className="underline hover:text-zinc-300">Privacy Policy</a>.
            </p>
        </form>
    );
};
