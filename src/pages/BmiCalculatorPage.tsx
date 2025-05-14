import BmiCalculator from "../components/molecules/BmiCalculator";
import LoginTemplate from "../components/templates/LoginTemplate";
import AuthShell from "../components/shell/AuthShell";

const BmiCalculatorPage = () => {
    return (
        <AuthShell>
            <LoginTemplate>
                <BmiCalculator />
            </LoginTemplate>
        </AuthShell>
    )
}

export default BmiCalculatorPage;