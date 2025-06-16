import React from "react";
import { useSelector } from "react-redux";

const Confirmation = () => {
  const formData = useSelector((state) => state.form);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Add debug logging
  console.log("Redux Form Data:", formData);

  // Check if data exists
  if (!formData) {
    return <div>Loading form data...</div>;
  }

  // Safely access nested properties
  const personal = formData.personal || {};
  const address = formData.address || {};
  const education = formData.education || {};
  const photoSign = formData.photoSign || {};
  const documents = formData.documents || {};

  return (
    <div className="p-4 md:p-8  max-w-4xl mx-auto font-satoshi">
      <div className="space-y-8">
        {/* Personal Details Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <div className="col-span-1 md:col-span-1 space-y-4">
              {photoSign?.photo?.preview && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Photo</p>
                  <img
                    src={photoSign.photo.preview}
                    alt="User's photo"
                    className="w-32 h-32 object-cover"
                  />
                </div>
              )}
              {formData.photoSign?.signature?.preview && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Signature</p>
                  <img
                    src={formData.photoSign.signature.preview}
                    alt="User's signature"
                    className="w-48 h-16 object-contain"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{personal.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Father's Name</p>
                <p className="font-medium">{personal.fathersName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-medium">{personal.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-medium">{personal.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-medium">
                  {formatDate(personal.dateOfBirth)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">JEE Roll No.</p>
                <p className="font-medium">{personal.jeeRollNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">JEE Rank</p>
                <p className="font-medium">{personal.jeeRank}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone No.</p>
                <p className="font-medium">{personal.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Father's Phone No.</p>
                <p className="font-medium">{personal.fathersPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email ID</p>
                <p className="font-medium">{personal.emailId}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Address Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Permanent Address</h3>
              <p className="whitespace-pre-wrap">
                {address.permanent?.address}
              </p>
              <div className="mt-2">
                <span className="font-medium">State: </span>
                {address.permanent?.state}
              </div>
              <div>
                <span className="font-medium">District: </span>
                {address.permanent?.district}
              </div>
              <div>
                <span className="font-medium">PIN: </span>
                {address.permanent?.pin}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Current Address</h3>
              <p className="whitespace-pre-wrap">{address.current?.address}</p>
              <div className="mt-2">
                <span className="font-medium">State: </span>
                {address.current?.state}
              </div>
              <div>
                <span className="font-medium">District: </span>
                {address.current?.district}
              </div>
              <div>
                <span className="font-medium">PIN: </span>
                {address.current?.pin}
              </div>
            </div>
          </div>
        </div>
        {/* Education Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Class 10</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">School: </span>
                  {education.class10?.school}
                </div>
                <div>
                  <span className="font-medium">Board: </span>
                  {education.class10?.board}
                </div>
                <div>
                  <span className="font-medium">Percentage: </span>
                  {education.class10?.percentage}%
                </div>
                <div>
                  <span className="font-medium">Total Marks: </span>
                  {education.class10?.totalMarks}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Class 12</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">School: </span>
                  {education.class12?.school}
                </div>
                <div>
                  <span className="font-medium">Board: </span>
                  {education.class12?.board}
                </div>
                <div>
                  <span className="font-medium">Percentage: </span>
                  {education.class12?.percentage}%
                </div>
                <div>
                  <span className="font-medium">PCM Percentage: </span>
                  {education.class12?.pcmPercentage}%
                </div>
                <div>
                  <span className="font-medium">Physics Marks: </span>
                  {education.class12?.physicsMarks}
                </div>
                <div>
                  <span className="font-medium">Chemistry Marks: </span>
                  {education.class12?.chemistryMarks}
                </div>
                <div>
                  <span className="font-medium">Mathematics Marks: </span>
                  {education.class12?.mathsMarks}
                </div>
                {education.class12?.subject4 && (
                  <div>
                    <span className="font-medium">
                      {education.class12.subject4}:{" "}
                    </span>
                    {education.class12?.subject4Marks}
                  </div>
                )}
                {education.class12?.subject5 && (
                  <div>
                    <span className="font-medium">
                      {education.class12.subject5}:{" "}
                    </span>
                    {education.class12?.subject5Marks}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Documents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(documents || {})
              .filter(
                ([key, value]) =>
                  value &&
                  value.name &&
                  !key.toLowerCase().includes("age vs count")
              )
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center space-x-2 bg-gray-50 p-3 rounded"
                >
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm truncate">
                    {key.replace(/([A-Z])/g, " $1").trim()}: {value.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
