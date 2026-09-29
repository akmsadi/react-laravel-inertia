import { Form, Head, Link } from "@inertiajs/react";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import RegisteredCustomerController from "@/actions/App/Http/Controllers/Customer/RegisteredCustomerController";
import { login as loginRoute } from "@/routes/customer";

export default function CustomerRegister() {
    return (
        <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
            <Head title="Create your account" />

            <div className="border border-zinc-200 bg-white p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-zinc-950">
                    Create your account
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                    Register to check out and track your orders.
                </p>

                <Form
                    {...RegisteredCustomerController.store.form()}
                    resetOnSuccess={["password", "password_confirmation"]}
                    className="mt-6 flex flex-col gap-5"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    autoFocus
                                    autoComplete="name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone (optional)</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    autoComplete="tel"
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    autoComplete="new-password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm password
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    required
                                    autoComplete="new-password"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-[#1f7a3d] hover:bg-[#176331]"
                                disabled={processing}
                            >
                                {processing && (
                                    <Spinner className="size-4 animate-spin" />
                                )}
                                Create account
                            </Button>
                        </>
                    )}
                </Form>

                <p className="mt-6 text-center text-sm text-zinc-600">
                    Already have an account?{" "}
                    <Link
                        href={loginRoute()}
                        className="font-medium text-[#1f7a3d] hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
