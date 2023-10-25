import { useState } from "react";

export function useForm(steps) {
    const [currentStep, setCurrentStep] = useState(0) 

    function changeStep(index, event){
        if(event) event.preventDefault()
        if(index<0 || index >= steps.lengthf) return
        setCurrentStep(index)
    }

    return {
        currentStep,
        currentComponent: steps[currentStep],
        changeStep,
        isHrmForm: currentStep == 1 ? true : false
    }
}