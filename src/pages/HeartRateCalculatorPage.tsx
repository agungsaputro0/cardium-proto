import HeartRateCalculator from "../components/molecules/HeartRateCalculator";
import LoginTemplate from "../components/templates/LoginTemplate";
import AuthShell from "../components/shell/AuthShell";

const HeartRateCalculatorPage = () => {
    return (
        <AuthShell>
            <LoginTemplate>
                <HeartRateCalculator />
            </LoginTemplate>
        </AuthShell>
    )
}

export default HeartRateCalculatorPage;