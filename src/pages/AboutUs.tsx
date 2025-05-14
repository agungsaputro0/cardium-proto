import AboutUsContent from "../components/molecules/AboutUsContent";
import LoginTemplate from "../components/templates/LoginTemplate";
import AuthShell from "../components/shell/AuthShell";

const AboutUsPage = () => {
    return (
        <AuthShell>
            <LoginTemplate>
                <AboutUsContent />
            </LoginTemplate>
        </AuthShell>
    )
}

export default AboutUsPage;