import ug from './assets/ug.jpeg'
import ug1 from './assets/ug1.png'
const UserGuide = () => {
    return (
      <div className="overflow-auto bg-white bg-opacity-70 h-full rounded-md">
        <div className='pt-12 p-20'>
        <div className='font-sans text-lg text-justify leading-loose'>
          <div className="italic ">
          "This app is our attempt to provide users with a go-to resource chat tool, our aim is to designe a tool that provides users with accurate and contextually relevant information from a trusted data source.
          In this guide we will walk you through the features and functionalities of our app, Hoping you make the most out of your experience."
          <p className="text-end">The Team, 9th of March 2024</p>
        </div>
        <div></div>
        
        <ol className="list-decimal">
            <li>
                <h3>Covered Scope</h3>
                <p>As of the current version, our data source coverage is limited to Series 38 Release 18, encompassing the following documents:</p>
                <ul  class="list-none pl-10">
                  <li>3GPP TS 38.300 V18.0.0 (2023-12)</li>
                  <li>3GPP TS 38.304 V18.0.0 (2023-12)</li>
                  <li>3GPP TS 38.305 V18.0.0 (2023-12)</li>
                  <li>3GPP TS 38.306 V18.0.0 (2023-12)</li>
                  <li>3GPP TS 38.307 V18.0.0 (2023-12)</li>
                </ul>
            </li>
            <li>
                <h3 className='pt-3'>Third-Party Integration</h3>
                <p>We are using OpenAI's APIs for the query embeddings and natrual language response generation.</p>
                <p>Future releases may include a resident models,that are not connected to the "outer-world".</p>
                <ul  class="list-none pl-10">
                  <li>- The Embedding Model Engine: text-embedding-3-large by OpenAI</li>
                  <li>- The Genrative Model Engine: gpt-4-turbo-preview by OpenAI</li>
                </ul>
            </li>

            <li className='pt-3' >
                <h3>Workflow</h3>
                <p><strong>A. Query Submission:</strong></p>
                <ul class="list-decimal pl-10">
                    <li>Users send queries to our server.</li>
                    <li>Queries undergo similarity search to retrieve the best three matching results.</li>
                </ul>

                <p><strong>B. Response Generation:</strong></p>
                <ul class="list-decimal pl-10">
                    <li>The generative model creates responses based on the retrieved information.</li>
                    <li>Users receive detailed answers, that includes the document, section, and original text source.</li>
                </ul>

                <p><strong>C. User Feedback:</strong></p>
                <ul class="list-none pl-10 pb-5">
                    <li>Users can rate answers, helping us evaluate retrieval performance.</li>
                
                <img src={ug}  alt="UG"></img>
                <p className='italic pb-5'>Figure 1: Example of succefull compilation from the chat app</p>
                <img src={ug1}  alt="UG"></img>
                <p className='italic'>Figure 2: Example of chat app refrains from generating answers to out of scope topics</p>
                </ul>
            </li>

            <li className='pt-3'>
                <h3>Context Injection and Query Recommendations</h3>
                <p>To enhance accuracy, we employ simple context injection.
                  For example, if a user queries "Apple specification," we wrap the query in 3GPP specification context, associating it with telecommunications and devices rather than food.</p>
                <p>This has proven to enhance how well the embedding model perfroms in term of representing the user query with the proper contexual association.</p>
                <p>Future releases will have a more advanced query processing.</p>
                <p className='pt-2'>For optimal results consider:</p>
                <ul class="list-none pl-10 pb-5">
                    <li>Keeping queries specific with clear intent.</li>
                    <li>Preferably using keywords found in 3GPP documents.</li>
                    <li>Avoiding multiple topics in a single question (maximum of 1-2 topics).</li>
                </ul>
            </li>

            <li className='pt-3'>
                <h3>System Parameters</h3>
                <p>The generative model system parameter refrains from generating answers if the information is not found in the retrieved source.
                  While this adds a layer of safety, source checking remains critical to ensure answers are derived from the correct documents.</p>
            </li>
        </ol>


        </div>
        </div>




      </div>

    );
  };
  
  export default UserGuide;