import { BooleanInput, Create, ReferenceInput, required, SimpleForm, TextField, TextInput } from "react-admin";

function ChallengeOptionCreate() {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="text" validate={[required()]} label="Text" />
                <BooleanInput source="correct" label="Correct option" />
                <ReferenceInput source="challengeId" reference="challenges" />
                <TextInput source="imageSrc" label="Image URL" />
                <TextInput source="audioSrc" label="Audio URL" />
            </SimpleForm>
        </Create>
    )
};

export default ChallengeOptionCreate;
