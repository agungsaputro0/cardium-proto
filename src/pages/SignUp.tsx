import SignUpForm from "../components/molecules/SignUpForm";
import LoginTemplate from "../components/templates/LoginTemplate";
import AuthShell from "../components/shell/AuthShell";

const SignUpPage = () => {
    return (
        <AuthShell>
            <LoginTemplate>
                <SignUpForm />
            </LoginTemplate>
        </AuthShell>
    )
}

export default SignUpPage;