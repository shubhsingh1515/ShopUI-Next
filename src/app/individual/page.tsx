import CoachingHome from "./components/CoachingHome";
import GreatHabit from "./components/GreatHabit";
import CoachesSection from "./components/MeetCoaches";
import Index from "./components/TryAverti";
import Testimo from "./components/TestimonialsSection";
import AvertiFor from "./components/AvertiFor";
import IndividualFooter from "./components/IndividualFooter";
import AvertiStepsPage from "./components/AvertiStepsPage";
import WhyAvertiWorks from "./components/WhyAvertiWorks";

export default function ProductsPage() {
  return (
    <div className=" bg-gray-50 ml-[-7rem] mr-[-7rem]">
      <CoachingHome />
      <AvertiStepsPage />
       <GreatHabit />
      <CoachesSection />
      <WhyAvertiWorks />
      <Testimo />
      <AvertiFor />
     
      <Index />
      <IndividualFooter />

      <div className="fixed bottom-8 right-8 z-50">
  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
    <span>Start your free Averti Systems trial</span>
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
    </div>
  );
}