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
import { Link } from "react-router";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <>
      <Card className="w-md mx-3 sm:mx-auto">
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
                        <InputGroupInput {...field} />
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
                        <InputGroupInput type="password" {...field} />
                        <InputGroupAddon>
                          <Lock />
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-2" variant="outline">
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
