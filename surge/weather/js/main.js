"use strict";function handleDocumentLoad(){var e=window.location.hash;if(e){var r=document.querySelector("header .search input");r.value=e.substring(1),handleRequest(loadData(e.substring(1)))}changeCurrentSchene("welcome"),loadHistoryFromStorage(localStorage),renderSearchHistory(searchHistory)}function changeCurrentSchene(e){var r=document.querySelector(".active");switch(r.classList.remove("active"),e){case"welcome":var t=document.querySelector(".welcome-block");t.classList.add("active");break;case"forecast":var n=document.querySelector(".forecast-block");n.classList.add("active");break;case"error":var o=document.querySelector(".error-block");o.classList.add("active")}}function loadData(e){return isFetchRequest?getForecastFetch(e):getForecastXHR(e)}function getForecastFetch(e){return fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+e+"&key="+GOOGLE_API_KEY).then(function(e){return e.json()}).then(function(e){if(0===e.results.length)throw new Error("Sorry, can't find your city:(");currentCity=e.results[0].formatted_address;var r=e.results[0].geometry.location,t=r.lat,n=r.lng;return fetch("https://shrouded-spire-35703.herokuapp.com/forecast/"+t+","+n+"?lang=en&units=si")}).then(function(e){return e.json()})}function getForecastXHR(e){return new Promise(function(r,t){var n=new XMLHttpRequest;n.open("GET","https://maps.googleapis.com/maps/api/geocode/json?address="+e+"&key="+GOOGLE_API_KEY,!1),n.onload=function(){if(200==this.status){var e=JSON.parse(this.response);if(0===e.results.length)throw new Error("Sorry, can't find your city:(");currentCity=e.results[0].formatted_address;var n=e.results[0].geometry.location,o=n.lat,a=n.lng,s=new XMLHttpRequest;s.open("GET","https://shrouded-spire-35703.herokuapp.com/forecast/"+o+","+a+"?lang=en&units=si",!1),s.onload=function(){if(200==this.status)r(JSON.parse(this.response));else{var e=new Error(this.statusText);e.code=this.status,t(e)}},s.onerror=function(){t(new Error("Network Error"))},s.send()}else{var c=new Error(this.statusText);c.code=this.status,t(c)}},n.onerror=function(){t(new Error("Network Error"))},n.send()})}function handleRequest(e){e.then(function(e){renderMainInformation(e,currentCity),changeCurrentSchene("forecast"),saveCityToHistory(currentCity),renderSearchHistory(searchHistory)})["catch"](function(e){handleApiError(e)})}function handleApiError(e){var r=document.querySelector(".error-block p");r.innerHTML=e,changeCurrentSchene("error")}function renderMainInformation(e,r){var t=document.querySelector("section.main h2");t.innerHTML=r;var n=new Skycons({color:"#e6a831"});n.add(document.querySelector("section.main .forecast-icon"),e.currently.icon),n.play();var o=document.querySelector(".forecast-info span.temperature");o.innerHTML="Temperature: "+e.currently.temperature.toFixed(1)+"°C";var a=document.querySelector("section.main span.humidity");a.innerHTML="Humidity: "+e.currently.humidity+"%";var s=document.querySelector("section.main span.wind-speed");s.innerHTML="Wind speed: "+e.currently.windSpeed+"m/s";var c=document.querySelector(".summary p");c.innerHTML=e.currently.summary}function renderSearchHistory(e){var r=document.querySelector("section.history ul");r.innerHTML="";for(var t=0;t<e.length;t++)r.innerHTML+='<li class="list-group-item">'+e[t]+"</li>"}function saveCityToHistory(e){searchHistory[0]!==e&&(searchHistory.indexOf(e)>0&&searchHistory.splice(searchHistory.indexOf(e),1),searchHistory.length>4&&searchHistory.pop(),searchHistory.unshift(e),saveHistoryToStorage(localStorage,searchHistory))}function loadHistoryFromStorage(e){var r=e.getItem("forecast");searchHistory=JSON.parse(r)||[]}function saveHistoryToStorage(e,r){e.setItem("forecast",JSON.stringify(r))}var isFetchRequest=!0,searchHistory=[],currentCity="",GOOGLE_API_KEY="AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY",switcher=document.querySelector(".switcher input");switcher.addEventListener("change",function(){var e=event.target.checked,r=document.querySelector(".switcher span");e?(isFetchRequest=!0,r.innerHTML="Fetch"):(isFetchRequest=!1,r.innerHTML="XHR")});var inputSearch=document.querySelector("header .search input");inputSearch.addEventListener("keyup",function(e){if(13===e.keyCode){var r=document.querySelector("header .search input"),t=r.value;t&&(handleRequest(loadData(t)),window.location.hash=t)}});var buttonSearch=document.querySelector("header button");buttonSearch.addEventListener("click",function(){var e=document.querySelector("header .search input"),r=e.value;r&&(handleRequest(loadData(r)),window.location.hash=r)});var historyUl=document.querySelector(".history ul");historyUl.addEventListener("click",function(){if(event.target.matches("li")){var e=document.querySelector("header .search input"),r=event.target.innerHTML;e.value=r,window.location.hash=r,handleRequest(loadData(r))}}),window.addEventListener("load",handleDocumentLoad),window.addEventListener("hashchange",function(){var e=window.location.hash.substring(1),r=document.querySelector("header .search input");r.value=e,handleRequest(loadData(e))});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiaGFuZGxlRG9jdW1lbnRMb2FkIiwiaGFzaCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaW5wdXRTZWFyY2giLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWx1ZSIsInN1YnN0cmluZyIsImhhbmRsZVJlcXVlc3QiLCJsb2FkRGF0YSIsImNoYW5nZUN1cnJlbnRTY2hlbmUiLCJsb2FkSGlzdG9yeUZyb21TdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwicmVuZGVyU2VhcmNoSGlzdG9yeSIsInNlYXJjaEhpc3RvcnkiLCJzY2hlbmUiLCJhY3RpdmUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ3ZWxjb21lIiwiYWRkIiwiZm9yZWNhc3QiLCJlcnJvciIsImNpdHkiLCJpc0ZldGNoUmVxdWVzdCIsImdldEZvcmVjYXN0RmV0Y2giLCJnZXRGb3JlY2FzdFhIUiIsImZldGNoIiwiR09PR0xFX0FQSV9LRVkiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsInJlc3VsdHMiLCJsZW5ndGgiLCJFcnJvciIsImN1cnJlbnRDaXR5IiwiZm9ybWF0dGVkX2FkZHJlc3MiLCJfZGF0YSRyZXN1bHRzJDAkZ2VvbWUiLCJnZW9tZXRyeSIsImxhdCIsImxuZyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwidGhpcyIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsIl9kYXRhJHJlc3VsdHMkMCRnZW9tZTIiLCJ4aHIyIiwic3RhdHVzVGV4dCIsImNvZGUiLCJvbmVycm9yIiwic2VuZCIsInByb21pc2UiLCJyZW5kZXJNYWluSW5mb3JtYXRpb24iLCJzYXZlQ2l0eVRvSGlzdG9yeSIsImhhbmRsZUFwaUVycm9yIiwiZXJyIiwiaW5uZXJIVE1MIiwiY2l0eURhdGEiLCJjaXR5TmFtZSIsInRpdGxlIiwic2t5Y29ucyIsIlNreWNvbnMiLCJjb2xvciIsImN1cnJlbnRseSIsImljb24iLCJwbGF5IiwidGVtcGVyYXR1cmUiLCJ0b0ZpeGVkIiwiaHVtaWRpdHkiLCJ3aW5kU3BlZWQiLCJzdW1tYXJ5IiwiaGlzdG9yeSIsImhpc3RvcnlVbCIsImkiLCJpbmRleE9mIiwic3BsaWNlIiwicG9wIiwidW5zaGlmdCIsInNhdmVIaXN0b3J5VG9TdG9yYWdlIiwic3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwic3RyaW5naWZ5Iiwic3dpdGNoZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiY2hlY2tlZCIsImV2ZW50IiwidGFyZ2V0IiwicmVxdWVzdFR5cGUiLCJlIiwia2V5Q29kZSIsImlucHV0IiwiYnV0dG9uU2VhcmNoIiwibWF0Y2hlcyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFrRUEsU0FBU0Esc0JBQXFCLEdBQ3BCQyxHQUFTQyxPQUFPQyxTQUFoQkYsSUFDUixJQUFJQSxFQUFNLENBQ1IsR0FBTUcsR0FBY0MsU0FBU0MsY0FBYyx1QkFDM0NGLEdBQVlHLE1BQVFOLEVBQUtPLFVBQVUsR0FDbkNDLGNBQWNDLFNBQVNULEVBQUtPLFVBQVUsS0FFeENHLG9CQUFvQixXQUNwQkMsdUJBQXVCQyxjQUN2QkMsb0JBQW9CQyxlQUd0QixRQUFTSixxQkFBb0JLLEdBQzNCLEdBQU1DLEdBQVNaLFNBQVNDLGNBQWMsVUFHdEMsUUFGQVcsRUFBT0MsVUFBVUMsT0FBTyxVQUVoQkgsR0FDTixJQUFLLFVBQ0gsR0FBTUksR0FBVWYsU0FBU0MsY0FBYyxpQkFDdkNjLEdBQVFGLFVBQVVHLElBQUksU0FDdEIsTUFFRixLQUFLLFdBQ0gsR0FBTUMsR0FBV2pCLFNBQVNDLGNBQWMsa0JBQ3hDZ0IsR0FBU0osVUFBVUcsSUFBSSxTQUN2QixNQUVGLEtBQUssUUFDSCxHQUFNRSxHQUFRbEIsU0FBU0MsY0FBYyxlQUNyQ2lCLEdBQU1MLFVBQVVHLElBQUksV0FRMUIsUUFBU1gsVUFBU2MsR0FDaEIsTUFBT0MsZ0JBQWlCQyxpQkFBaUJGLEdBQVFHLGVBQWVILEdBR2xFLFFBQVNFLGtCQUFpQkYs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QkMsRUFBUTZGLEVBQU03RixLQUNoQkEsS0FDRkUsY0FBY0MsU0FBU0gsSUFDdkJMLE9BQU9DLFNBQVNGLEtBQU9NLEtBSzdCLElBQU04RixjQUFlaEcsU0FBU0MsY0FBYyxnQkFDNUMrRixjQUFhUixpQkFBaUIsUUFBUyxXQUNyQyxHQUFNTyxHQUFRL0YsU0FBU0MsY0FBYyx3QkFDL0JDLEVBQVE2RixFQUFNN0YsS0FDaEJBLEtBQ0ZFLGNBQWNDLFNBQVNILElBQ3ZCTCxPQUFPQyxTQUFTRixLQUFPTSxJQUkzQixJQUFNMEUsV0FBWTVFLFNBQVNDLGNBQWMsY0FDekMyRSxXQUFVWSxpQkFBaUIsUUFBUyxXQUNsQyxHQUFLRSxNQUFNQyxPQUFPTSxRQUFRLE1BQTFCLENBRUEsR0FBTWxHLEdBQWNDLFNBQVNDLGNBQWMsd0JBQ3JDQyxFQUFRd0YsTUFBTUMsT0FBTy9CLFNBRTNCN0QsR0FBWUcsTUFBUUEsRUFDcEJMLE9BQU9DLFNBQVNGLEtBQU9NLEVBRXZCRSxjQUFjQyxTQUFTSCxPQUd6QkwsT0FBTzJGLGlCQUFpQixPQUFRN0Ysb0JBRWhDRSxPQUFPMkYsaUJBQWlCLGFBQWMsV0FDcEMsR0FBTXJFLEdBQU90QixPQUFPQyxTQUFTRixLQUFLTyxVQUFVLEdBQ3RDNEYsRUFBUS9GLFNBQVNDLGNBQWMsdUJBQ3JDOEYsR0FBTTdGLE1BQVFpQixFQUNkZixjQUFjQyxTQUFTYyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmxldCBpc0ZldGNoUmVxdWVzdCA9IHRydWU7XHJcbmxldCBzZWFyY2hIaXN0b3J5ID0gW107XHJcbmxldCBjdXJyZW50Q2l0eSA9ICcnO1xyXG5cclxuY29uc3QgR09PR0xFX0FQSV9LRVkgPSAnQUl6YVN5RGE3RENMMk5POUtNUGQ5RFlWa191M3Uwd0NibTBYWEZZJztcclxuXHJcblxyXG5jb25zdCBzd2l0Y2hlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zd2l0Y2hlciBpbnB1dCcpO1xyXG5zd2l0Y2hlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgY29uc3QgeyBjaGVja2VkIH0gPSBldmVudC50YXJnZXQ7XHJcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3dpdGNoZXIgc3BhbicpO1xyXG5cclxuICBpZiAoY2hlY2tlZCkge1xyXG4gICAgaXNGZXRjaFJlcXVlc3QgPSB0cnVlO1xyXG4gICAgcmVxdWVzdFR5cGUuaW5uZXJIVE1MID0gJ0ZldGNoJztcclxuICB9IGVsc2Uge1xyXG4gICAgaXNGZXRjaFJlcXVlc3QgPSBmYWxzZTtcclxuICAgIHJlcXVlc3RUeXBlLmlubmVySFRNTCA9ICdYSFInO1xyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IGlucHV0U2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyIC5zZWFyY2ggaW5wdXQnKTtcclxuaW5wdXRTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xyXG4gIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlciAuc2VhcmNoIGlucHV0Jyk7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGlucHV0LnZhbHVlO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIGhhbmRsZVJlcXVlc3QobG9hZERhdGEodmFsdWUpKTtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB2YWx1ZTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuY29uc3QgYnV0dG9uU2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyIGJ1dHRvbicpO1xyXG5idXR0b25TZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXIgLnNlYXJjaCBpbnB1dCcpO1xyXG4gIGNvbnN0IHZhbHVlID0gaW5wdXQudmFsdWU7XHJcbiAgaWYgKHZhbHVlKSB7XHJcbiAgICBoYW5kbGVSZXF1ZXN0KGxvYWREYXRhKHZhbHVlKSk7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHZhbHVlO1xyXG4gIH1cclxufSk7XHJcblxyXG5jb25zdCBoaXN0b3J5VWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlzdG9yeSB1bCcpO1xyXG5oaXN0b3J5VWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgaWYgKCFldmVudC50YXJnZXQubWF0Y2hlcygnbGknKSkgcmV0dXJuO1xyXG5cclxuICBjb25zdCBpbnB1dFNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlciAuc2VhcmNoIGlucHV0Jyk7XHJcbiAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQuaW5uZXJIVE1MO1xyXG5cclxuICBpbnB1dFNlYXJjaC52YWx1ZSA9IHZhbHVlO1xyXG4gIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gdmFsdWU7XHJcblxyXG4gIGhhbmRsZVJlcXVlc3QobG9hZERhdGEodmFsdWUpKTtcclxufSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGhhbmRsZURvY3VtZW50TG9hZCk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsICgpID0+IHtcclxuICBjb25zdCBjaXR5ID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpO1xyXG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyIC5zZWFyY2ggaW5wdXQnKTtcclxuICBpbnB1dC52YWx1ZSA9IGNpdHk7XHJcbiAgaGFuZGxlUmVxdWVzdChsb2FkRGF0YShjaXR5KSk7XHJcbn0pXHJcblxyXG5mdW5jdGlvbiBoYW5kbGVEb2N1bWVudExvYWQoKSB7XHJcbiAgY29uc3QgeyBoYXNoIH0gPSB3aW5kb3cubG9jYXRpb247XHJcbiAgaWYgKGhhc2gpIHtcclxuICAgIGNvbnN0IGlucHV0U2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyIC5zZWFyY2ggaW5wdXQnKTtcclxuICAgIGlucHV0U2VhcmNoLnZhbHVlID0gaGFzaC5zdWJzdHJpbmcoMSk7XHJcbiAgICBoYW5kbGVSZXF1ZXN0KGxvYWREYXRhKGhhc2guc3Vic3RyaW5nKDEpKSk7XHJcbiAgfVxyXG4gIGNoYW5nZUN1cnJlbnRTY2hlbmUoJ3dlbGNvbWUnKTtcclxuICBsb2FkSGlzdG9yeUZyb21TdG9yYWdlKGxvY2FsU3RvcmFnZSk7XHJcbiAgcmVuZGVyU2VhcmNoSGlzdG9yeShzZWFyY2hIaXN0b3J5KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlQ3VycmVudFNjaGVuZShzY2hlbmUpIHtcclxuICBjb25zdCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XHJcbiAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICBzd2l0Y2ggKHNjaGVuZSkge1xyXG4gICAgY2FzZSAnd2VsY29tZSc6XHJcbiAgICAgIGNvbnN0IHdlbGNvbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VsY29tZS1ibG9jaycpO1xyXG4gICAgICB3ZWxjb21lLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlICdmb3JlY2FzdCc6XHJcbiAgICAgIGNvbnN0IGZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcmVjYXN0LWJsb2NrJyk7XHJcbiAgICAgIGZvcmVjYXN0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlICdlcnJvcic6XHJcbiAgICAgIGNvbnN0IGVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yLWJsb2NrJyk7XHJcbiAgICAgIGVycm9yLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBkZWZhdWx0OlxyXG5cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWREYXRhKGNpdHkpIHtcclxuICByZXR1cm4gaXNGZXRjaFJlcXVlc3QgPyBnZXRGb3JlY2FzdEZldGNoKGNpdHkpIDogZ2V0Rm9yZWNhc3RYSFIoY2l0eSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEZvcmVjYXN0RmV0Y2goY2l0eSkge1xyXG4gIHJldHVybiBmZXRjaChgaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9hZGRyZXNzPSR7Y2l0eX0ma2V5PSR7R09PR0xFX0FQSV9LRVl9YClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIH0pXHJcbiAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgaWYgKGRhdGEucmVzdWx0cy5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcihcIlNvcnJ5LCBjYW4ndCBmaW5kIHlvdXIgY2l0eTooXCIpO1xyXG4gICAgICBjdXJyZW50Q2l0eSA9IGRhdGEucmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcztcclxuICAgICAgY29uc3QgeyBsYXQsIGxuZyB9ID0gZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uO1xyXG4gICAgICByZXR1cm4gZmV0Y2goYGh0dHBzOi8vc2hyb3VkZWQtc3BpcmUtMzU3MDMuaGVyb2t1YXBwLmNvbS9mb3JlY2FzdC8ke2xhdH0sJHtsbmd9P2xhbmc9ZW4mdW5pdHM9c2lgKTtcclxuICAgIH0pXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICB9KVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Rm9yZWNhc3RYSFIoY2l0eSkge1xyXG5cclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKCdHRVQnLCBgaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9hZGRyZXNzPSR7Y2l0eX0ma2V5PSR7R09PR0xFX0FQSV9LRVl9YCwgZmFsc2UpO1xyXG5cclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICBpZiAoZGF0YS5yZXN1bHRzLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKFwiU29ycnksIGNhbid0IGZpbmQgeW91ciBjaXR5OihcIik7XHJcbiAgICAgICAgY3VycmVudENpdHkgPSBkYXRhLnJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3M7XHJcbiAgICAgICAgY29uc3QgeyBsYXQsIGxuZyB9ID0gZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uO1xyXG5cclxuICAgICAgICB2YXIgeGhyMiA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhocjIub3BlbignR0VUJywgYGh0dHBzOi8vc2hyb3VkZWQtc3BpcmUtMzU3MDMuaGVyb2t1YXBwLmNvbS9mb3JlY2FzdC8ke2xhdH0sJHtsbmd9P2xhbmc9ZW4mdW5pdHM9c2lgLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIHhocjIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IodGhpcy5zdGF0dXNUZXh0KTtcclxuICAgICAgICAgICAgZXJyb3IuY29kZSA9IHRoaXMuc3RhdHVzO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhocjIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIk5ldHdvcmsgRXJyb3JcIikpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhocjIuc2VuZCgpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IodGhpcy5zdGF0dXNUZXh0KTtcclxuICAgICAgICBlcnJvci5jb2RlID0gdGhpcy5zdGF0dXM7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZWplY3QobmV3IEVycm9yKFwiTmV0d29yayBFcnJvclwiKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHhoci5zZW5kKCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZVJlcXVlc3QocHJvbWlzZSkge1xyXG4gIHByb21pc2VcclxuICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICByZW5kZXJNYWluSW5mb3JtYXRpb24oZGF0YSwgY3VycmVudENpdHkpO1xyXG5cclxuICAgICAgY2hhbmdlQ3VycmVudFNjaGVuZSgnZm9yZWNhc3QnKTtcclxuICAgICAgc2F2ZUNpdHlUb0hpc3RvcnkoY3VycmVudENpdHkpO1xyXG4gICAgICByZW5kZXJTZWFyY2hIaXN0b3J5KHNlYXJjaEhpc3RvcnkpO1xyXG5cclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBoYW5kbGVBcGlFcnJvcihlcnJvcik7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVBcGlFcnJvcihlcnJvcikge1xyXG4gIGNvbnN0IGVyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvci1ibG9jayBwJyk7XHJcbiAgZXJyLmlubmVySFRNTCA9IGVycm9yO1xyXG4gIGNoYW5nZUN1cnJlbnRTY2hlbmUoJ2Vycm9yJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlck1haW5JbmZvcm1hdGlvbihjaXR5RGF0YSwgY2l0eU5hbWUpIHtcclxuXHJcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uLm1haW4gaDInKTtcclxuICB0aXRsZS5pbm5lckhUTUwgPSBjaXR5TmFtZTtcclxuXHJcbiAgLy8gaWNvbnNcclxuICBjb25zdCBza3ljb25zID0gbmV3IFNreWNvbnMoe1wiY29sb3JcIjogXCIjZTZhODMxXCJ9KTtcclxuICBza3ljb25zLmFkZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uLm1haW4gLmZvcmVjYXN0LWljb24nKSwgY2l0eURhdGEuY3VycmVudGx5Lmljb24pO1xyXG4gIHNreWNvbnMucGxheSgpO1xyXG5cclxuICBjb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JlY2FzdC1pbmZvIHNwYW4udGVtcGVyYXR1cmUnKTtcclxuICB0ZW1wZXJhdHVyZS5pbm5lckhUTUwgPSBgVGVtcGVyYXR1cmU6ICR7Y2l0eURhdGEuY3VycmVudGx5LnRlbXBlcmF0dXJlLnRvRml4ZWQoMSl9wrBDYDtcclxuXHJcbiAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uLm1haW4gc3Bhbi5odW1pZGl0eScpO1xyXG4gIGh1bWlkaXR5LmlubmVySFRNTCA9IGBIdW1pZGl0eTogJHtjaXR5RGF0YS5jdXJyZW50bHkuaHVtaWRpdHl9JWA7XHJcblxyXG4gIGNvbnN0IHdpbmRTcGVlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24ubWFpbiBzcGFuLndpbmQtc3BlZWQnKTtcclxuICB3aW5kU3BlZWQuaW5uZXJIVE1MID0gYFdpbmQgc3BlZWQ6ICR7Y2l0eURhdGEuY3VycmVudGx5LndpbmRTcGVlZH1tL3NgO1xyXG5cclxuICBjb25zdCBzdW1tYXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1bW1hcnkgcCcpO1xyXG4gIHN1bW1hcnkuaW5uZXJIVE1MID0gY2l0eURhdGEuY3VycmVudGx5LnN1bW1hcnk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclNlYXJjaEhpc3RvcnkoaGlzdG9yeSkge1xyXG4gIGNvbnN0IGhpc3RvcnlVbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24uaGlzdG9yeSB1bCcpO1xyXG4gIGhpc3RvcnlVbC5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBoaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBoaXN0b3J5VWwuaW5uZXJIVE1MICs9IGA8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj4ke2hpc3RvcnlbaV19PC9saT5gO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZUNpdHlUb0hpc3RvcnkoY2l0eSkge1xyXG4gIGlmIChzZWFyY2hIaXN0b3J5WzBdID09PSBjaXR5KSByZXR1cm47XHJcbiAgaWYgKHNlYXJjaEhpc3RvcnkuaW5kZXhPZihjaXR5KSA+IDApIHtcclxuICAgICBzZWFyY2hIaXN0b3J5LnNwbGljZShzZWFyY2hIaXN0b3J5LmluZGV4T2YoY2l0eSksIDEpO1xyXG4gIH1cclxuICBpZiAoc2VhcmNoSGlzdG9yeS5sZW5ndGggPiA0KSB7XHJcbiAgICBzZWFyY2hIaXN0b3J5LnBvcCgpO1xyXG4gIH1cclxuICBzZWFyY2hIaXN0b3J5LnVuc2hpZnQoY2l0eSk7XHJcblxyXG4gIHNhdmVIaXN0b3J5VG9TdG9yYWdlKGxvY2FsU3RvcmFnZSwgc2VhcmNoSGlzdG9yeSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRIaXN0b3J5RnJvbVN0b3JhZ2Uoc3RvcmFnZSkge1xyXG4gIGNvbnN0IGZvcmVjYXN0ID0gc3RvcmFnZS5nZXRJdGVtKCdmb3JlY2FzdCcpO1xyXG4gIHNlYXJjaEhpc3RvcnkgPSBKU09OLnBhcnNlKGZvcmVjYXN0KSB8fCBbXTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZUhpc3RvcnlUb1N0b3JhZ2Uoc3RvcmFnZSwgaGlzdG9yeSkge1xyXG4gIHN0b3JhZ2Uuc2V0SXRlbSgnZm9yZWNhc3QnLCBKU09OLnN0cmluZ2lmeShoaXN0b3J5KSk7XHJcbn0iXX0=
