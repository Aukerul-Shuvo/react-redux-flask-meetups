import { useEffect,useState } from "react";
import "./base.css";
import "./main.css";
import "./meetup-details.css";
import "./add_meeting.css";
import axios from "axios"
// import ArticleList from "./components/MeetupList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMeeting } from "./store/actions/mactions";
import  {MeetupList}  from "./components/MeetupList";
 
function App() { 
    const [toggle_details,setToggle_details] = useState(false);
    const [toggle_add,setToggle_add] = useState(false);
    const [articles, setArticles] = useState([]);
    const dispatch= useDispatch();


    const onDetailsBtnClick = () =>{
        setToggle_details(!toggle_details);
        console.log(toggle_details);
    }

    const onAddBtnClick = () =>{
        setToggle_add(!toggle_add);
        console.log(toggle_add);
    }


    const fetchmeeting= async()=>{
        const response=await axios
        .get('http://localhost:5000/')
      .catch(error => console.log(error))
        dispatch(setMeeting( response.data))
    } 

  useEffect(()=>{
  fetchmeeting();
  },[]);
  

  let meet = useSelector((state) => state.allmeeting.meetings);
  const {title, description} = meet;
   //const {description} = meet;
  
  const meeting= useSelector((state)=>state)
//console.log(meeting)
console.log("ttttttttttttttttttttttttttttt",title)
console.log(description)
  return (
    <>
        <body>
    <header id="main-header">
        
        <nav><a href="" id="main-logo">Flask meetups</a></nav><h1></h1>
        
    <p>Find the one that best suits your needs</p>

    </header>
    <main>
   
        
    <section>
        <h2>Upcoming meetups</h2>
        <ol>
            
        <li className="meetup-item">
    <article>
        <div className="meetup-summary">
            <div className="meetup-image">
                <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
            </div>
            <div className="meetup-details">
           
            {/* {articles && articles.map(article =>{
            return (
            <div key= {article.id}> */}
   { console.log(articles,"   from app  id", articles.id)} 

                <h3>{title}</h3>
                <p>{description}</p>

                {/* <hr/>
               </div>
            )
            
            })} */}
     {/* <Meetuplist/> */}
                
            </div>
        </div> 
      

        <div className="meetup-actions">
            <button className="btn" onClick={()=>onDetailsBtnClick()}>More Details</button>
            <button className="btn" onClick={()=>onAddBtnClick()}>Add Meetup</button>
            {/* <a href="meetup-details" className="btn" onClick={()=>onDetailsBtnClick()}>More Details</a> */}
            {/* <a href="add_meetups" className="btn">Set Meeting</a> */}
        </div>
        {toggle_details?
        <div>
        <article>
        {/* <img src="" alt=""> */}

        <section id="location">
            <h2>Meetup Location</h2>
            <address>This meetup takes place in <span></span> </address>
        </section>

        <section id="details">
            <h2>What's this Meetup is about?</h2>
            <p>{title}</p>
            <p>{description}</p>
            <footer>
                <p>Need more details? Please <a href="">contact the organizer</a> (but don't spam us)</p>
            </footer>
        </section>

        <section id="registration">
            <h2>Join US!</h2>
            FORM
        </section>
    </article>
    </div>
        :""}

{toggle_add?
        <div class="column is-4 is-offset-4 form-group">
        <h3 class="title">Add Meeting</h3>
        <div class="box">
            <form method="POST" action="/add_meetups">
                <div class="field">
                    <div class="control">
                        <input class="input is-large" type="text" name="title" placeholder="title" autofocus=""/>
                    </div>
                </div>
    
                <div class="field">
                    <div class="control">
                        <input class="input is-large" type="text" name="description" placeholder="description" autofocus=""/>
                    </div>
                </div>
    
                <button class="button is-block is-info is-large is-fullwidth">submit</button>
            </form>
        </div>
    </div>
        :""}
        
    </article>
</li>    
        </ol>
    </section>

    </main>

</body>

    </>
  );
}

export default App;
