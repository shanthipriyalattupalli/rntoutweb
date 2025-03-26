export default function OrderTracking({ selectedSubOrder, steps, getCurrentStep }) {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {selectedSubOrder ? (
        <div className="flex flex-col items-center py-6 relative md:flex-row md:justify-between">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 w-full">
            {steps
              .filter((step, index) => {
                if (selectedSubOrder.orderStatus === "canceled") {
                  return index === 0 || index === steps.length - 1;
                }
                return true; 
              })
              .map((step, index, filteredSteps) => {
                const currentStep = getCurrentStep(selectedSubOrder.orderStatus);
                const isCompleted = Array.isArray(currentStep)
                  ? currentStep.includes(index)
                  : index <= currentStep;
                const isDelivered = selectedSubOrder.orderStatus === "delivered";
                const isCanceled = selectedSubOrder.orderStatus === "canceled";

                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center w-full relative last:pb-0 pb-8 md:pb-0`}
                  >

                    <div
                      className={`text-center text-md sm:text-sm md:text-base mb-2 md:mb-4 font-medium ${
                        isCanceled && index === filteredSteps.length - 1
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

                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border-2 z-10 text-lg font-semibold ${
                        isCanceled && index === filteredSteps.length - 1
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

                    {index < filteredSteps.length - 1 && (
                      <div
                        className={`absolute w-0.5 h-12 sm:h-14 border-l-2 border-dashed md:hidden bottom-[0px]
                        ${isCanceled ? "border-red-500" 
                        : isDelivered ? "border-green-500" 
                        : index < currentStep ? "border-blue-500" 
                        : "border-gray-300"}`}
                      ></div>
                    )}

                    {index < filteredSteps.length - 1 && (
                      <div
                        className={`absolute top-1/2 md:top-[69%] lg:top-[69%] left-[100%] transform -translate-x-1/2 h-0.5 border-t-2 border-dashed hidden md:block ${
                          isCanceled
                            ? "border-red-500 md:w-[20rem] w-[10rem] sm:w-[14rem] lg:w-[28rem] 2xl:w-[30rem]" 
                            : isDelivered
                            ? "border-green-500 md:w-[8rem] lg:w-[10rem] xl:w-[12rem] 2xl:w-[14rem]"
                            : index < currentStep
                            ? "border-blue-500 md:w-[8rem] lg:w-[10rem] xl:w-[12rem] 2xl:w-[14rem]"
                            : "border-gray-300 md:w-[8rem] lg:w-[10rem] xl:w-[12rem] 2xl:w-[14rem]"
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
