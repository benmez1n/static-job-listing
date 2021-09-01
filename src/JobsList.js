import { useEffect , useState} from "react";
import data from "./data";
import Job from "./Job";
const JobsList = () => {
    const [jobs , setJobs] = useState([])
    const [isLoading , setIsLoading ] = useState(true);
    const [filterArr,setFilterArr] = useState([]);
    const [newJobs,setNewJobs] = useState(data);
    const clickHandler = (e) =>{
        if(filterArr.includes(e)) return
        else {
            setFilterArr([...filterArr,e]);
            setNewJobs(newJobs.filter((item)=>{
                    const skills = [...item.tools,...item.languages,item.role,item.level];
                    return  skills.includes(e);
                }    
            ))
        }
    }

    const removeHandler = (id)=>{
        setFilterArr(filterArr.filter((item,index)=>{return (index !== id)}))
        setJobs(newJobs);
    }
    const clearHandler = (e)=>{
        e.preventDefault();
        setJobs(data);
        setFilterArr([]);
    }

    useEffect(()=>{
        setJobs(data)
        setIsLoading(false)
    },[])
    useEffect(()=>{
        setJobs(newJobs)
    },[newJobs])
    return ( 
        <div className="jobsList">
            {isLoading && <h1 className="loading">Loading...</h1>}
            {filterArr[0] && 
                <div className="filterContainer">
                    {
                        filterArr.map((item,id)=>{
                            return(
                                <span key={id}>
                                    <span className="filterBtn">{item}</span>
                                    <span  className="remove"onClick={()=>removeHandler(id)}></span>
                                </span>
                            )
                        })
                    }
                    <span className="clear" onClick={clearHandler}>clear</span>
                </div>
            }
            {jobs.map(job=>{
                return(
                    <Job {...job} key={job.id} clickHandler={clickHandler}/>
                )
            })
            }
        </div>
     );
}
 
export default JobsList;