import { useState } from "react";

export function useForm(steps, setIsSpecificMonth) {
    const [currentStep, setCurrentStep] = useState(0) 

    function changeStep(index, event){
        if(event) event.preventDefault()
        if(index<0 || index >= steps.lengthf) return
        if(index == 2) setIsSpecificMonth(true)
        setCurrentStep(index)
    }

    return {
        currentStep,
        currentComponent: steps[currentStep],
        changeStep,
        isHrmForm: currentStep == 1 ? true : false
    }
}