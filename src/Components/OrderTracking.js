import React from 'react'

export default function OrderTracking({selectedSubOrder,steps,getCurrentStep}) {
  return (
    <div>
    {selectedSubOrder ? (
<div className="w-full flex items-center justify-between py-6 relative">
<div className="flex items-center space-x-6">
{steps.map((step, index) => {
  const currentStep = getCurrentStep(selectedSubOrder.orderStatus);
  const isCompleted = index <= currentStep;
  const isDelivered = selectedSubOrder.orderStatus === "delivered";
  const isCanceled = selectedSubOrder.orderStatus === "canceled";

  return (
    <div className="flex flex-col">
    <div key={index} className="flex flex-col items-center relative">
      {/* Step Label */}
      <div
        className={`w-48 text-center ${
          isCanceled && index === currentStep
            ? "text-red-500 font-bold"
            : isDelivered && index === currentStep
            ? "text-green-500 font-bold"
            : isCompleted
            ? "text-blue-500 font-bold"
            : "text-gray-300"
        }`}
      >
        {step.label}
      </div>

      {/* Step Circle */}
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full border-2 z-10 ${
          isCanceled && index === currentStep
            ? "border-red-500 bg-red-100"
            : isDelivered && index === currentStep
            ? "border-green-500 bg-green-100"
            : isCompleted
            ? "border-blue-500 bg-blue-100"
            : "border-gray-300 bg-gray-100"
        }`}
      >
        {step.icon}
      </div>

      {/* Connecting Dotted Line */}
      {index < steps.length - 1 && (
        <div
          className={`absolute top-[66%] left-[43%] transform -translate-y-1/2 w-[13rem] h-0.5 border-t-2 border-dashed ${
            isCanceled
              ? "border-red-500"
              : isDelivered
              ? "border-green-500"
              : index < currentStep
              ? "border-blue-500"
              : "border-gray-300"
          }`}
        ></div>
      )}
    </div>
    </div>
  );
})}
</div>
</div>
) : (
<p className="text-gray-500 text-center">Select a suborder to view tracking</p>
)}
</div>
  )
}
