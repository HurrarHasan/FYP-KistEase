import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import { Review } from "./Review";
import { Submit } from "./Submit";
import { CustomerSignup } from "./CustomerSignup";
import { CustomerCnicImage } from "./CustomerCnicImage";
import { CustomerBillImage } from "./CustomerBillImage";

import { GuarantorSignup } from "./GuarantorSignup";
import { GuarantorCnicImage } from "./GuarantorCnicImage";
import { ProductSelection } from "./ProductSelection";
import { InstallmentCalculator } from "./InstallmentCalculator";

const defaultData = {
  CustomerName: "",
  CustomerPhoneNumber: "",
  CustomerEmailAddress: "",
  CustomerAddress: "",
  CustomerCnic: "",
  GuarantorName: "",
  GuarantorPhoneNumber: "",
  GuarantorEmailAddress: "",
  ProductName: "",
  ProductYear: "",
  ProductBrand: "",
  ProductModel: "",
  ProductPrice: "",
  ProductQty: "",
  TotalAmount: "",
  DownPayment: "",
  MonthlyPayment: "",
};

const steps = [
  { id: "CustomerSignup" },
  { id: "CustomerCnicImage" },
  { id: "CustomerBillImage" },
  { id: "GuarantorSignup" },
  { id: "GuarantorCnicImage" },
  { id: "ProductSelection" },
  { id: "InstallmentCalculator" },

  { id: "review" },
  { id: "submit" },
];

export const StepFormForExistingCustomer = () => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ steps, initialStep: 0 });
  const props = { formData, setForm, navigation };

  switch (step.id) {
    case "CustomerSignup":
      return <CustomerSignup {...props} />;
    case "CustomerCnicImage":
      return <CustomerCnicImage {...props} />;
    case "CustomerBillImage":
      return <CustomerBillImage {...props} />;

    case "GuarantorSignup":
      return <GuarantorSignup {...props} />;
    case "GuarantorCnicImage":
      return <GuarantorCnicImage {...props} />;
    case "ProductSelection":
      return <ProductSelection {...props} />;
    case "InstallmentCalculator":
      return <InstallmentCalculator {...props} />;

    case "review":
      return <Review {...props} />;
    case "submit":
      return <Submit {...props} />;
  }

  return (
    <div>
      <h1>Multi step form</h1>
    </div>
  );
};
