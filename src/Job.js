//component for every job in the list 
const Job = ({id,company,logo,newJob,featured,position,
    role,level,postedAt,contract,location,languages,tools,clickHandler}) => {
    return (
        <div className={featured ? "jobsItem featuredJob":"jobsItem"} key={id}>
            <div className="jobInfo">
                <img src={logo} alt={company}/>
                <div className="info">
                    <div className="jobDesc">
                        <span className="company">{company} </span>
                        {newJob && <span className="new">new!</span>}
                        {featured && <span className="featured">featured</span>}
                    </div>
                    <div className="position">
                        <span>{position}</span>
                    </div>
                    <div className="timeThings">
                        <span className="postedAT">{postedAt}</span>
                        <span className="contract">{contract}</span>
                        <span className="location">{location}</span>
                    </div>
                </div>
            </div>
            <div className="skills">
                <span className="role" onClick={()=>clickHandler(role)}>{role}</span>
                <span className="level" onClick={()=>clickHandler(level)}>{level}</span>
                {
                    languages.map((language,index)=>{
                        return(
                            <span className="langauges" key={index} onClick={()=>clickHandler(language)}>{language}</span>
                        )
                    })
                }
                {
                    tools.map((tool,index)=>{
                        return(
                            <span className="tools" key={index} onClick={()=>clickHandler(tool)}>{tool}</span>
                        )
                    })
                }
            </div>
        </div>
     );
}
 
export default Job;