
     import React, { useState, useEffect } from 'react';

     // Sample data based on the structure provided
     function Address() {
     const data = {
       country: {
         "1": {
           CountryId: 1,
           Name: "India",
           MobileNumberCode: 91,
           Currency: "INR"
         }
       },
       state: {
         "1": { StateId: 1, Name: "Madhya Pradesh", CountryId: 1 },
         "2": { StateId: 2, Name: "Andhra Pradesh", CountryId: 1 },
         "3": { StateId: 3, Name: "Arunachal Pradesh", CountryId: 1 },
         "4": { StateId: 4, Name: "Assam", CountryId: 1 },
         "5": { StateId: 5, Name: "Bihar", CountryId: 1 },
         "6": { StateId: 6, Name: "Chhattisgarh", CountryId: 1 },
         "7": { StateId: 7, Name: "Goa", CountryId: 1 },
         "8": { StateId: 8, Name: "Gujarat", CountryId: 1 },
         "9": { StateId: 9, Name: "Haryana", CountryId: 1 },
         "10": { StateId: 10, Name: "Himachal Pradesh", CountryId: 1 },
         "11": { StateId: 11, Name: "Jharkhand", CountryId: 1 },
         "12": { StateId: 12, Name: "Karnataka", CountryId: 1 }
       },
       city: {
         "313": { CityId: 313, Name: "Alirajpur", StateId: 1 },
         "314": { CityId: 314, Name: "Anuppur", StateId: 1 },
         "315": { CityId: 315, Name: "Ashoknagar", StateId: 1 },
         "316": { CityId: 316, Name: "Balaghat", StateId: 1 },
         "317": { CityId: 317, Name: "Barwani", StateId: 1 },
         "318": { CityId: 318, Name: "Betul", StateId: 1 },
         "319": { CityId: 319, Name: "Bhind", StateId: 1 },
         "320": { CityId: 320, Name: "Bhopal", StateId: 1 },
         "321": { CityId: 321, Name: "Burhanpur", StateId: 1 },
         "322": { CityId: 322, Name: "Chhatarpur", StateId: 1 },
         "323": { CityId: 323, Name: "Chhindwara", StateId: 1 }
       }
     };
          const [selectedCountry, setSelectedCountry] = useState('');
          const [selectedState, setSelectedState] = useState('');
          const [states, setStates] = useState([]);
          const [cities, setCities] = useState([]);
          
          useEffect(() => {
               if (selectedCountry) {
                    const filteredStates = Object.values(data.state).filter(
                         state => state.CountryId === parseInt(selectedCountry)
                         );
                         setStates(filteredStates);
                         setSelectedState('');
                         setCities([]);
                    } else {
                         setStates([]);
                         setSelectedState('');
                         setCities([]);
                    }
               }, [selectedCountry]);
               
               useEffect(() => {
                    if (selectedState) {
                         const filteredCities = Object.values(data.city).filter(
                              city => city.StateId === parseInt(selectedState)
                              );
                              setCities(filteredCities);
                         } else {
                              setCities([]);
                         }
                    }, [selectedState]);
                    
              return (
                    <div>
           <form>
             <label htmlFor="country">Country:</label>
             <select
               id="country"
               name="country"
               value={selectedCountry}
               onChange={(e) => setSelectedCountry(e.target.value)}
             >
               <option value="">Select Country</option>
               {Object.values(data.country).map((country) => (
                 <option key={country.CountryId} value={country.CountryId}>
                   {country.Name}
                 </option>
               ))}
             </select>
     
             <label htmlFor="state">State:</label>
             <select
               id="state"
               name="state"
               value={selectedState}
               onChange={(e) => setSelectedState(e.target.value)}
               disabled={!selectedCountry}
             >
               <option value="">Select State</option>
               {states.map((state) => (
                 <option key={state.StateId} value={state.StateId}>
                   {state.Name}
                 </option>
               ))}
             </select>
     
             <label htmlFor="city">City:</label>
             <select
               id="city"
               name="city"
               disabled={!selectedState}
             >
               <option value="">Select City</option>
               {cities.map((city) => (
                 <option key={city.CityId} value={city.CityId}>
                   {city.Name}
                 </option>
               ))}
             </select>
           </form>
         </div>
     
     
  )
}

export default Address