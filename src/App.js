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
import _default from "react-redux/es/components/connect";

let el_id =-1;

function App() { 
    const [title,settitle]=useState(false);
    const [desc,setdesc]=useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault();
        window.location = "http://localhost:3000/";
        
        
        var title=event.target.title.value;
        var description= event.target.description.value;
        const response= await axios
        .post('/add_meetups',
        {title:title,
        description:description}
        )
        .catch(error => console.log(error))

      };
    const toggle_arr = new Array().fill();
    const [toggle_details,setToggle_details] = useState(false);

    const [toggle_add,setToggle_add] = useState(false);
    const [el_id_arr, setArticles] = useState([]);
    const dispatch= useDispatch();
    

    const onDetailsBtnClick = (index) =>{
        
        setToggle_details(!toggle_details);
        el_id = document.getElementById(index).id;
        el_id= parseInt(el_id);
        el_id_arr.push(el_id);
        
        console.log("el_id_arr", el_id_arr)
        console.log("find", el_id_arr)
        
    }


    const onAddBtnClick = (index) =>{
        el_id = document.getElementById(index).id;
        el_id= parseInt(el_id);
        setToggle_add(!toggle_add);
        //console.log(toggle_add);
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
  

  const meet = useSelector((state) => state.allmeeting.meetings);

  return ( 
      <>
      <header id="main-header">
          <nav><a href="" id="main-logo">Flask meetups</a></nav><h1></h1>
          <p>Find the one that best suits your needs</p>
          </header>
          <section> <h2>Upcoming meetups</h2> </section>
          {(Object.keys(meet).length !==0) && 
        <> 
        {meet.Title.map((element,index) => {
            console.log("element", element)
            // ind++
return (<>
    
    <section>
    <ol>
    <li className="meetup-item">
    <article>
    <div className="meetup-summary">
    <div className="meetup-image">
                <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
            </div>
            <div className="meetup-details">
                <h3>{meet.Title[index]}</h3> 
                <p>{meet.description[index]}</p>
                </div>
                </div>
                <div className="meetup-actions">
            <button className="btn_details" id={index} onClick={()=>onDetailsBtnClick(index)}>More Details</button>
            <meeting_details id= {index} />
            <button className="btn_add" id={index} onClick={()=>onAddBtnClick(index)}>Add Meetup</button>
            {/* <a href="meetup-details" className="btn" onClick={()=>onDetailsBtnClick()}>More Details</a> */}
            {/* <a href="add_meetups" className="btn">Set Meeting</a> */}
        </div>
        { //console.log("triggered", index, el_id)
        (toggle_details && (index == el_id))?
        <div>
        <article>
        
        
        <section id="location">
            <h2>Meetup Location</h2>
            <address>This meetup takes place in <span></span> </address>
        </section>

        <section id="details">
            <h2>What's this Meetup is about?</h2>
            <p>{meet.Title[index]}</p>
            <p>{meet.description[index]}</p>
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
        : ""}

{(toggle_add && (index == el_id))?
        <div class="column is-4 is-offset-4 form-group">
        <h3 class="title">Add Meeting</h3>
        <div class="box">
            <form method="POST" onSubmit={handleSubmit} action="/">
                <div class="field">
                    <div class="control">
                        <input onChange={(e)=>settitle(e.target.value)} class="input is-large" type="text" name="title" placeholder="title" autofocus=""/>
                    </div>
                </div>
    
                <div class="field">
                    <div class="control">
                        <input onChange={(e)=>setdesc(e.target.value)}class="input is-large" type="text" name="description" placeholder="description" autofocus=""/>
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
                </>) 

// console.log("element", element);
})} </>
       

     

      
}

</>


  );
}

export default App;
