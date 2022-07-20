import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

/* Shop Login */
import ContentAreaShopLogin from "./components/ShopLogin/ContentAreaShopLogin";
/* Shop Signup */
import ShopSignup from "./components/ShopSignup/ShopSignup";
/* Forget Password */
import ContentAreaForgetPassword from "./components/ForgetPassword/ContentAreaForgetPassword";
/* Reset Password */
import ContentAreaResetPassword from "./components/ResetPassword/ContentAreaResetPassword";
/* Dashboard */
import Dashboard from "./components/Dashboard/Dashboard";
/* Installment Calculation For Walkin Customers */
import ContentAreaCalculator from "./components/Calculator/ContentAreaCalculator";
/* Add Products */
import ContentAreaAddProducts from "./components/ProductManagement/ContentAreaAddProducts";
/* View All Products */
import ContentAreaViewAllProducts from "./components/ProductManagement/ContentAreaViewAllProducts";
import ContentAreaViewAllProductsNew from "./components/ProductManagement/ContentAreaViewAllProductsNew";
import ContentAreaViewProductsCategory from "./components/ProductManagement/ContentAreaViewProductsCategory";

/* Start Purchase Process */
import { MultiStepForm } from "./components/stepForm/MultiStepForm";
import { StepFormForExistingCustomer } from "./components/StepFormForExistingCustomer/StepFormForExistingCustomer";
/* Check Defaulter Status */
import ContentAreaStatusChecker from "./components/StatusChecker/ContentAreaStatusChecker";

import ContentAreaCustomersTable from "./components/Customers/ContentAreaCustomersTable";
import ContentAreaDefaulterTable from "./components/Customers/ContentAreaDefaulterTable";
import ContentAreaNotificationTable from "./components/Customers/ContentAreaNotificationsTable";
import EditCustomerDialog from "./components/Customers/EditCustomerDialog";
import DialogForSellerUpdate from "./DialogForSellerUpdate";


/* Check Shop Finances */
import ContentAreaCheckFinances from "./components/CheckFinances/ContentAreaCheckFinances";
import ContentAreaEligibilityChecker from "./components/EligibilityChecker/ContentAreaEligibilityChecker";

import ContentAreaPaymentHistoryTable from "./components/Customers/ContentAreaPaymentHistoryTable";
import ContentAreaSingle from "./components/Customers/ContentAreaSingle";
import ContentAreaSingleProduct from "./components/ProductManagement/ContentAreaSingleProduct";
import ProductDetailHistoryTable from "./components/ProductManagement/ProductDetailHistoryTable";
import Textfieldtest from "./components/ShopLogin/Textfieldtest";
import LeniencyAfterDueDate from "./components/LeniencyAfterDueDate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Shop Login & Signup */}
          <Route exact path="/ShopLogin" element={<ContentAreaShopLogin />} />
          <Route exact path="/ProductDetailHistoryTable" element={<ProductDetailHistoryTable />} />
          <Route exact path="/Single/:id" element={<ContentAreaSingle />} />
          <Route
            exact
            path="/EditCustomerDialog"
            element={<EditCustomerDialog />}
          />
          <Route exact path="/TestText" element={<Textfieldtest />} />
          {/* Dashboard */}
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/DialogForSellerUpdate" element={<DialogForSellerUpdate />} />
          <Route
            exact
            path="/CustomersTable"
            element={<ContentAreaCustomersTable />}
          />
          <Route
            exact
            path="/SingleProduct/:id"
            element={<ContentAreaSingleProduct />}
          />
          <Route
            exact
            path="/DefaulterTable"
            element={<ContentAreaDefaulterTable />}
          />
          <Route
            exact
            path="/LeniencyAfterDueDate"
            element={<LeniencyAfterDueDate />}
          />

          <Route
            exact
            path="/NotificationTable"
            element={<ContentAreaNotificationTable />}
          />
          <Route exact path="/ShopSignup" element={<ShopSignup />} />

          {/* Forget Password */}
          <Route
            exact
            path="/ForgetPassword"
            element={<ContentAreaForgetPassword />}
          />
          {/* Eligibility Checker */}
          <Route
            exact
            path="/EligibilityChecker"
            element={<ContentAreaEligibilityChecker />}
          />

          {/* ResetPassword */}

          {/* Installment Calculation For Walkin Customers */}
          <Route exact path="/Calculator" element={<ContentAreaCalculator />} />

          {/* Add & View All Products */}
          <Route
            exact
            path="/AddProducts"
            element={<ContentAreaAddProducts />}
          />

          <Route
            exact
            path="/ViewAllProducts"
            element={<ContentAreaViewAllProducts />}
          />
          <Route
            exact
            path="/ViewProductsCategory"
            element={<ContentAreaViewProductsCategory />}
          />
          <Route
            exact
            path="/ViewAllProductsNew/:product_id"
            element={<ContentAreaViewAllProductsNew />}
          />

          {/* Check Defaulter Status */}
          <Route
            exact
            path="/StatusChecker"
            element={<ContentAreaStatusChecker />}
          />

          {/* Check Shop Finances */}
          <Route
            exact
            path="/CheckFinances"
            element={<ContentAreaCheckFinances />}
          />

          <Route
            exact
            path="/ResetPassword/:id"
            element={<ContentAreaResetPassword />}
          />
          <Route
            exact
            path="/ResetPassword"
            element={<ContentAreaResetPassword />}
          />

          <Route
            exact
            path="/PaymentHistoryTable"
            element={<ContentAreaPaymentHistoryTable />}
          />
          <Route exact path="/MultiStepForm" element={<MultiStepForm />} />
          <Route exact path="/StepFormForExistingCustomer/:id" element={<StepFormForExistingCustomer />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
