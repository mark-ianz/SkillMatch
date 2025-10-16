import { Button } from "@/components/ui/button";
import useSignupStore from "@/store/SignupStore";
import React from "react";

export default function SkipStep() {
  const nextStep = useSignupStore((state) => state.nextStep);

  return <Button className="w-24" variant={"outline"} onClick={nextStep}>Skip</Button>;
}
