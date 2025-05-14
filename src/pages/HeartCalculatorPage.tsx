import HeartCalculator from "../components/molecules/HeartCalculator";
import LoginTemplate from "../components/templates/LoginTemplate";
import AuthShell from "../components/shell/AuthShell";

const HeartCalculatorPage = () => {
    return (
        <AuthShell>
            <LoginTemplate>
                <HeartCalculator />
            </LoginTemplate>
        </AuthShell>
    )
}

export default HeartCalculatorPage;