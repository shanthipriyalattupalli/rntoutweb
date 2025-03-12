import React from 'react';

export default function OrderTracking({ selectedSubOrder, steps, getCurrentStep }) {
  return (
<div className="w-full px-4 md:px-6 lg:px-8">
  {selectedSubOrder ? (
    <div className="flex flex-col items-center py-6 relative md:flex-row md:justify-between">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 w-full">
        {steps.map((step, index) => {
          const currentStep = getCurrentStep(selectedSubOrder.orderStatus);
          const isCompleted = index <= currentStep;
          const isDelivered = selectedSubOrder.orderStatus === "delivered";
          const isCanceled = selectedSubOrder.orderStatus === "canceled";

          return (
            <div
              key={index}
              className="flex flex-col items-center w-full relative last:pb-0 pb-8 md:pb-0"
            >
              {/* Step Label */}
              <div
                className={`text-center text-md sm:text-sm md:text-base mb-2 md:mb-4 font-medium ${
                  isCanceled && index === currentStep
                    ? "text-red-500"
                    : isDelivered && index === currentStep
                    ? "text-green-500"
                    : isCompleted
                    ? "text-blue-500"
                    : "text-gray-300"
                }`}
              >
                {step.label}
              </div>

              {/* Step Circle */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border-2 z-10 text-lg font-semibold ${
                  isCanceled && index === currentStep
                    ? "border-red-500 bg-red-100 text-red-500"
                    : isDelivered && index === currentStep
                    ? "border-green-500 bg-green-100 text-green-500"
                    : isCompleted
                    ? "border-blue-500 bg-blue-100 text-blue-500"
                    : "border-gray-300 bg-gray-100 text-gray-400"
                }`}
              >
                {step.icon}
              </div>

              {/* Vertical Connecting Dotted Line for Small Screens */}
              {index < steps.length - 1 && (
          <div
          className={`absolute w-0.5 h-12 sm:h-14 border-l-2 border-dashed md:hidden bottom-[0px]
          ${isCanceled ? "border-red-500" 
          : isDelivered ? "border-green-500" 
          : index < currentStep ? "border-blue-500" 
          : "border-gray-300"}`}
        ></div>
        
              )}

              {/* Horizontal Line for Large Screens */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-1/2 md:top-[69%] lg:top-[69%l left-[100%] transform -translate-x-1/2 w-full h-0.5 border-t-2 border-dashed hidden md:block md:w-[8rem] lg:w-[10rem] xl:w-[12rem] 2xl:w-[23rem] ${
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
          );
        })}
      </div>
    </div>
  ) : (
    <p className="text-gray-500 text-center text-sm sm:text-base md:text-lg">
      Select a suborder to view tracking
    </p>
  )}
</div>


  );
}
