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
                <div key={index} className="flex flex-col items-center w-full relative">
                  {/* Step Label */}
                  <div
                    className={`text-center text-xs sm:text-sm md:text-base lg:text-lg mb-2 md:mb-4 ${
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
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border-2 z-10 ${
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
                      className={`absolute top-[66%] left-[100%] transform -translate-x-1/2 translate-y-1/2 w-full h-0.5 border-t-2 border-dashed md:w-[10rem] lg:w-[12rem] xl:w-[10rem] 2xl:w-[24rem] ${
                        isCanceled
                          ? "border-red-500"
                          : isDelivered
                          ? "border-green-500"
                          : index < currentStep
                          ? "border-blue-500"
                          : "border-gray-300"
                      } hidden md:block`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center text-sm sm:text-base md:text-lg">Select a suborder to view tracking</p>
      )}
    </div>
  );
}
