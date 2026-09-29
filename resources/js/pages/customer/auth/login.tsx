import { Form, Head, Link } from "@inertiajs/react";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import AuthenticatedCustomerSessionController from "@/actions/App/Http/Controllers/Customer/AuthenticatedCustomerSessionController";
import { register as registerRoute } from "@/routes/customer";

export default function CustomerLogin({ status }: { status?: string }) {
    return (
        <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
            <Head title="Log in" />

            <div className="border border-zinc-200 bg-white p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-zinc-950">Log in</h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Log in to continue to checkout.
                </p>

                {status && (
                    <p className="mt-4 text-sm font-medium text-green-700">
                        {status}
                    </p>
                )}

                <Form
                    {...AuthenticatedCustomerSessionController.store.form()}
                    resetOnSuccess={["password"]}
                    className="mt-6 flex flex-col gap-5"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox id="remember" name="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-[#1f7a3d] hover:bg-[#176331]"
                                disabled={processing}
                            >
                                {processing && (
                                    <Spinner className="size-4 animate-spin" />
                                )}
                                Log in
                            </Button>
                        </>
                    )}
                </Form>

                <p className="mt-6 text-center text-sm text-zinc-600">
                    Don&apos;t have an account?{" "}
                    <Link
                        href={registerRoute()}
                        className="font-medium text-[#1f7a3d] hover:underline"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
