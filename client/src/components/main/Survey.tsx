import { useState } from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";

const defaultCreatorOptions = { 
    
 }

export function SurveyCreatorWidget(props) {
  let [creator, setCreator] = useState<SurveyCreator>();

  if (!creator) {
    creator = new SurveyCreator(props.options || defaultCreatorOptions);
    setCreator(creator);
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <SurveyCreatorComponent creator={creator} />
    </div>
  );
}
