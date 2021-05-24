import React, { Component } from 'react';
import styles from './Weather.module.css'
import Form from './Form'
// importing images
import image1 from '../assets/1sunny.png'
import image2 from '../assets/2cloudy.png'
import image3 from '../assets/3partlycloudy.png'
import image4 from '../assets/4rainy.png'
import image5 from '../assets/5snowy.png'







const api={
    key:"db1db4eeee71b3bb7f6850f811bb33b1",
    base:"https://api.openweathermap.org/data/2.5/weather?"
  }
class Weather extends Component {

    // state
    state={
        city:undefined,
        country: undefined,
        temp:undefined,
        maxtemp:undefined,
        mintemp:undefined,
        weathertype:undefined,
        currentweatherimage:undefined
    }

    weatherImages=[image1,image2,image3,image4,image5]

    // convert to celcius
    convertoC=(temp)=>{
        let c=Math.floor(temp-273)
        return c
    }
    usersearch=undefined
    getWeather=async(e)=>{
        e.preventDefault()
        console.log(e.target.value)
        const apicall=await fetch(`${api.base}q=${this.usersearch}&appid=${api.key}`);
        const response =await apicall.json()
        console.log(response)

        

        // changing state
        try{
            this.setState({
                city:response.name,
                country:response.sys.country,
                temp:this.convertoC( response.main.temp),
                maxtemp:this.convertoC( response.main.temp_max),
                mintemp:this.convertoC( response.main.temp_min),
                weathertype:response.weather[0].main
               
    
                
    
            })
        }
        catch(e){
            console.log('Your city is invalid')
        }
       
        console.log(this.state.weathertype)
        
        switch(this.state.weathertype){
            case 'Clear':
                this.setState({currentweatherimage:this.weatherImages[0]})
                break
            case 'Clouds':
                this.setState({currentweatherimage:this.weatherImages[1]})
                break
            case 'rainy':
                this.setState({currentweatherimage:this.weatherImages[3]})
                break
            case 'snowy':
                this.setState({currentweatherimage:this.weatherImages[4]})
                break
            default:
                break

        }
        console.log(this.state.currentweatherimage)
    }

    changes=(e)=>{
        this.usersearch=e.target.value
    }

    render(){
        return (
            <>
            <div className={styles.mainheading}>
                Weather App
            </div>
            <div className={styles.myweatherbox}>
                
                    <Form change={this.changes} loadweather={this.getWeather}/>
                
    
                {/* weathericons section */}
                <div className={styles.weathericonshow}>
                <h2>{this.state.city}, {this.state.country}</h2>
                    <img className={styles.images} src={this.state.currentweatherimage} alt="" />
                    
                </div>
                <div className={styles.tempsection}>
                    <div className={styles.currenttemp}>
                    <h2>{this.state.temp}&deg;C</h2>
                    </div>
                        <h2>{this.state.weathertype}</h2>
                        
                        <h3>Max:{this.state.maxtemp}&deg;C / Min:{this.state.mintemp}&deg;C </h3>
                        
                    
                  
                </div>
                
            </div>
            </>
        );

    }
   
};

export default Weather;