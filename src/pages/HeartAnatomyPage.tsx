import HeartAnatomyAndPhysiology from "../components/molecules/HeartAnatomyAndPhysiology";
import LoginTemplate from "../components/templates/LoginTemplate";
import AuthShell from "../components/shell/AuthShell";

const HeartAnatomyPage = () => {
    return (
        <AuthShell>
            <LoginTemplate>
                <HeartAnatomyAndPhysiology />
            </LoginTemplate>
        </AuthShell>
    )
}

export default HeartAnatomyPage;