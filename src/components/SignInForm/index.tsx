import { ChangeEvent, FormEvent, useState } from "react";
import { TextInput } from "../TextInput";
import { WithUser } from "../../contexts/UserContext";
import { useRouter } from "next/router";
import { Button } from "../Button";

export const SignInForm = () => {
  const { SignInUser } = WithUser();
  const router = useRouter();
  const initalState = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(initalState);
  const [error, setError] = useState<string | null>(null);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((currentValue) => ({ ...currentValue, [name]: value }));
  };
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await SignInUser({
        data: state,
      });
      router.push("/");
    } catch (error) {
      setError(error as string);
    }
  };
  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="w-full h-full flex flex-col gap-5 bg-white text-black rounded-md p-5 justify-center"
        onSubmit={submitHandler}
      >
        <TextInput
          name="email"
          type="email"
          autoComplete="username"
          placeholder="Email"
          required
          value={state.email}
          onChange={changeHandler}
        />
        <TextInput
          name="password"
          type="password"
          placeholder="Password"
          required
          value={state.password}
          autoComplete="current-password"
          onChange={changeHandler}
        />

        <Button type="submit">Submit</Button>
        {error && `${error}`}
      </form>
    </div>
  );
};
