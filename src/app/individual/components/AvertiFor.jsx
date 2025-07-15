import React from "react";
import { Check, X } from "lucide-react";

const ZabitPricingTable = () => {
  const features = [
    {
      label: "Personalized 1:1 Support",
      therapy: true,
      lifeCoaching: true,
      personalTraining: true,
      zabitCoaching: true,
    },
    {
      label: "Daily Reminders",
      therapy: false,
      lifeCoaching: false,
      personalTraining: false,
      zabitCoaching: true,
    },
    {
      label: "Daily Accountability",
      therapy: false,
      lifeCoaching: false,
      personalTraining: false,
      zabitCoaching: true,
    },
    {
      label: "App-Based Tracking",
      therapy: false,
      lifeCoaching: false,
      personalTraining: false,
      zabitCoaching: true,
    },
  ];

  const FeatureIcon = ({ included }) => {
    if (included) {
      return (
        <div className="flex justify-center">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
        </div>
      );
    }
    return (
      <div className="flex justify-center">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <X className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto  mt-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-gray-400 mb-4">
          Q: Who is Averti Systems for?
        </h1>
        <p className="text-xl text-gray-700">
          A: Averti Systems is for people who just need a bit of{" "}
          <span className="font-bold">accountability</span> for everyday habits.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left font-semibold text-gray-700 text-lg pb-4">
                Best for...
              </th>
              <th className="text-center pb-4">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  Therapy
                </div>
                <div className="text-gray-600">Mental Health</div>
              </th>
              <th className="text-center pb-4">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  Life Coaching
                </div>
                <div className="text-gray-600">Life goals</div>
              </th>
              <th className="text-center pb-4">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  Personal Training
                </div>
                <div className="text-gray-600">Workouts</div>
              </th>
              <th className="text-center pb-4">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  Averti Systems Coaching
                </div>
                <div className="text-gray-600">Everyday Habits</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-4 font-medium text-gray-700">
                  {feature.label}
                </td>
                <td className="py-4 text-center">
                  <FeatureIcon included={feature.therapy} />
                </td>
                <td className="py-4 text-center">
                  <FeatureIcon included={feature.lifeCoaching} />
                </td>
                <td className="py-4 text-center">
                  <FeatureIcon included={feature.personalTraining} />
                </td>
                <td className="py-4 text-center">
                  <FeatureIcon included={feature.zabitCoaching} />
                </td>
              </tr>
            ))}
            <tr className="border-t border-gray-200">
              <td className="py-4 font-semibold text-gray-700 text-lg">Cost</td>
              <td className="py-4 text-center">
                <div className="text-2xl font-bold text-purple-600">$100+</div>
                <div className="text-gray-500">/ week</div>
              </td>
              <td className="py-4 text-center">
                <div className="text-2xl font-bold text-purple-600">$100+</div>
                <div className="text-gray-500">/ week</div>
              </td>
              <td className="py-4 text-center">
                <div className="text-2xl font-bold text-purple-600">$75+</div>
                <div className="text-gray-500">/ week</div>
              </td>
              <td className="py-4 text-center">
                <div className="text-2xl font-bold text-orange-500">$8.99</div>
                <div className="text-gray-500">/ week</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ZabitPricingTable;
