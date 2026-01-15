import { Edit, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin";

function ChallengeEdit() {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="question" validate={[required()]} label="Question" />
                <SelectInput source="type" validate={[required()]} choices={[{ id: "SELECT", name: "SELECT" }, { id: "ASSIST", name: "ASSIST" }]} label="Type" />
                <ReferenceInput source="lessonId" reference="lessons" />
                <NumberInput source="order" />
            </SimpleForm>
        </Edit>
    )
};

export default ChallengeEdit;
