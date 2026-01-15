import { Create, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin";

function ChallengeCreate() {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="question" validate={[required()]} label="Question" />
                <SelectInput source="type" validate={[required()]} choices={[{ id: "SELECT", name: "SELECT" }, { id: "ASSIST", name: "ASSIST" }]} label="Type" />
                <ReferenceInput source="lessonId" reference="lessons" />
                <NumberInput source="order" />
            </SimpleForm>
        </Create>
    )
};

export default ChallengeCreate;
