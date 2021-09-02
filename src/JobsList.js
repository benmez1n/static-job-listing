import { useEffect , useState} from "react";
import data from "./data";
import Job from "./Job";
const JobsList = () => {
    const [jobs , setJobs] = useState([])
    const [isLoading , setIsLoading ] = useState(true);
    const [filterArr,setFilterArr] = useState([]);

    useEffect(()=>{
        setJobs(data)
        setIsLoading(false)
    },[])
    
    //reusable functions
    const checkSkills = ({role,level,tools,languages}) => {
        let  skills = [role,level];
        if(tools)skills = [...tools,...skills]
        if(languages)skills = [...languages,...skills]
        return skills;
    }
    const addFilter = ({role,level,tools,languages},item)=>{
        const filtred = [...filterArr,item]
        const skills = checkSkills({role,level,tools,languages});
        return filtred.every((skill) => skills.includes(skill))
    } 
    const removeFilter = ({role,level,tools,languages},filtred) => {
        if(filtred.length === 0) return true;
        else{
            const skills = checkSkills({role,level,tools,languages});
            return filtred.every((skill) => skills.includes(skill))
        }  
    }

    //Handlers
    //for add filter in the filter items
    const clickHandler = (e) =>{
        if(filterArr.includes(e)){return}
        setFilterArr([...filterArr,e]);
        setJobs(data.filter((item)=>{return addFilter({...item},e)}))     
    }

     //for remove button in the filter items 
    const removeHandler = (id)=>{
        let filtred,moreFiltre,lastFilter;
        setFilterArr(filterArr.filter((item,index)=>{return (index !== id)}))
        if(id !== 0){
            filtred = filterArr.slice(0,id);
            moreFiltre = filtred.slice(id+1,filterArr.length)
            lastFilter = [...filtred,...moreFiltre]
        }else{
            lastFilter = filterArr.slice(id+1,filterArr.length)
        }
        setJobs(data.filter((item)=>{return removeFilter({...item},lastFilter)}));  
    }

    //for clear button in the filter
    const clearHandler = ()=>{
        setJobs(data);
        setFilterArr([]);
    }


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