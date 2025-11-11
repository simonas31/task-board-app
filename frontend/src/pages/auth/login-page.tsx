import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { api } from "@/lib/axios";
import * as React from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const LoginPage = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    setLoading(true);
    api
      .post("/login", data)
      .then((res) => {
        setLoading(false);
        setUser(res.data.user);
        toast.success("You've logged in successfully!");
        navigate("/dashboard");
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong. Try again");
      });
  }

  return (
    <>
      <Card className="w-md mx-3 sm:mx-auto" variant="light">
        <CardHeader>
          <div className="text-center">
            <h4>Login</h4>
            <p className="mt-2 text-muted-foreground">
              Enter your credentials to continue
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput disabled={loading} {...field} />
                        <InputGroupAddon>
                          <User />
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput
                          type="password"
                          disabled={loading}
                          {...field}
                        />
                        <InputGroupAddon>
                          <Lock />
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full mt-2"
                variant="outline"
                disabled={loading}
              >
                Sign in
              </Button>
            </form>
          </Form>
          <CardFooter className="mt-5">
            <div className="mx-auto">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginPage;
