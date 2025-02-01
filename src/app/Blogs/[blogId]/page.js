import React from "react";
const blog = "/Assets/blog1.svg";
const blogs ="/Assets/blogs-image.svg"
const BlogPage = () => {
  return (
    <div className=" min-h-screen p-6 flex justify-center w-full">
      <div className=" w-full bg-white shadow-lg p-6 rounded-lg flex flex-col md:flex-row gap-6">
        {/* Main Blog Section */}
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold">
            Furniture That Should Only Be Rented: Reasons and Benefits
          </h1>
          <img
            src={blog} // Replace with actual image URL
            alt="Furniture"
            className="rounded-lg my-4"
          />
          <p className="text-gray-700 leading-relaxed">
          You know how some furniture is just not worth buying? We’re talking pieces that get worn out, damaged, or just feel outdated after a few years of use. As much as you want a stylish living room or a decked out patio, renting furniture can be a more practical approach instead of buying and making a long-term costly commitment. In this article, we’ll explore furniture that’s better off rented based on factors like usage, maintenance, and the need for flexibility. From sofa sets that show wear and tear to seasonal outdoor items used only part of the year, read on to learn which pieces you’re better off renting.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
          We’ll also discuss the benefits rental provides, like easy upgrades, storage solutions, and experimenting with new styles. Together, we’ll determine when renting furniture makes more sense than buying so you can make informed furniture decisions. Whether you’re accommodating guests, revamping your home office, or prepping for a special event, renting furniture may be the right call for furniture that’s only temporarily needed or likely to need replacement after heavy use.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
          You know how some furniture is just not worth buying? We’re talking pieces that get worn out, damaged, or just feel outdated after a few years of use. As much as you want a stylish living room or a decked out patio, renting furniture can be a more practical approach instead of buying and making a long-term costly commitment. In this article, we’ll explore furniture that’s better off rented based on factors like usage, maintenance, and the need for flexibility. From sofa sets that show wear and tear to seasonal outdoor items used only part of the year, read on to learn which pieces you’re better off renting.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
          We’ll also discuss the benefits rental provides, like easy upgrades, storage solutions, and experimenting with new styles. Together, we’ll determine when renting furniture makes more sense than buying so you can make informed furniture decisions. Whether you’re accommodating guests, revamping your home office, or prepping for a special event, renting furniture may be the right call for furniture that’s only temporarily needed or likely to need replacement after heavy use.
          </p>
        </div>
        {/* Related Blogs Sidebar */}
        <div className="md:w-1/3   rounded-lg">
          <h2 className="text-xl font-semibold">Related Blogs</h2>
          <div className="mt-4 space-y-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="flex gap-4 items-center  p-3 rounded-lg"
              >
                <img
                  src={blogs} // Replace with actual image
                  alt="Blog"
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h3 className="text-sm font-semibold">
                    Plant Decoration in Living Room Spaces: 6 Decor Tips
                  </h3>
                  <p className="text-xs text-gray-600">
                    Home decor isn't complete until you add some plants...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogPage;