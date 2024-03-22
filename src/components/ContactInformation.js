// ContactInformation.js
import mufida from './assets/mufida.jpg'
import yinan from './assets/yinan.jpeg'
import antti from './assets/antti.png'
const ContactInformation = () => {
    return (
<div className='bg-white bg-opacity-70 h-full rounded-md flex justify-center items-center'>
  <div className='h-5/6 w-1/2 text-center'>

    <div className="text-2xl">
      Our team is eagerly awaiting feedback and ideas to improve the application.
      Our next release is fully dependent on user story experience, and based on user feedback, we will know which module to prioritize and focus on for improvement.
    </div>

    <div className="flex flex-col space-y-10 m-20 text-2xl text-lg text-justify">

      <div className="flex justify-center items-center space-x-5">
        <img className='rounded' src={yinan} alt="Yinan"></img>
        <div className="pl-5 max-w-96">
          <p className="font-semibold">Yinan Li</p>
          <p className="pb-2 text-xl">t1liyi00@students.oamk.fi</p>
          <p className="text-lg">Contact Yinan To request more documents coverage, share future wishes, and provide feedback on the way the system works to cover 3GPP documentations.</p>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-5">
      <img className='rounded' src={antti} alt="antti"></img>
        <div className="pl-5 max-w-96">
          <p className="font-semibold">Antti-Jussi Niku</p>
          <p className="text-xl pb-2">t0nian05@students.oamk.fi</p>
          <p className="text-lg ">Contact Antti about overall UI-UX feedback, such as display, formatting and comments on the webchat experience.</p>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-5">

      <img className='rounded' src={mufida} alt="Mufida"></img>
          <div className="pl-5 max-w-96">
            <p className="text-xl font-semibold">Mufida Alakulju</p>
            <p className="pb-2 text-xl">c1dkmo00@students.oamk.fi</p>
          <p className=" text-lg">Contact Mufida about core functionalities, concerns such as the quality of retrieved sources and answer generation.</p>
        </div>
      </div>

    </div>
  </div>
</div>

    )
}
export default ContactInformation;