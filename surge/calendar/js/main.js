"use strict";function showCalendar(){var e=void 0,t=void 0,n=void 0,o=void 0,a=void 0,s=void 0;e=document.getElementById("calendar-id").value||"123",t=document.getElementById("change-date").checked,n=document.getElementById("add-events").checked,o=document.getElementById("delete-events").checked,a=document.getElementById("classes").value||"",s=document.getElementById("title").value||"";var d=document.querySelector(".calendar-show");d&&d.remove();var r=document.createElement("div");r.className="calendar-show",r.id=e,document.body.appendChild(r),new Calendar({el:"#"+e,showControls:t,allowAddEvents:n,allowRemoveEvents:o,className:a,title:s}).run();var c='\n  <!-- Bootstrap -->\n  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">\n\n  <!-- Styles -->\n  <link rel="stylesheet" href="https://rawgit.com/HappyCodeHere/js--base-course/02/02/ht/HappyCodeHere/tasks/calendar/dist/css/main.css">\n\n  <!-- Calendar widget -->\n  <script src="https://rawgit.com/HappyCodeHere/js--base-course/02/02/ht/HappyCodeHere/tasks/calendar/dist/js/main.js"></script>\n\n  <!-- Calendar settings -->\n  <script>\n    (function() {\n      var div = document.createElement(\'div\');\n      div.id = '+e+";\n      document.body.appendChild(div);\n\n      new Calendar({\n        el: '#' + '"+e+"',\n        showControls: "+t+",\n        allowAddEvents: "+n+",\n        allowRemoveEvents: "+o+",\n        className: '"+a+"',\n        title: '"+s+"'\n      }).run();\n    })();\n  </script>\n  ",l=document.querySelector("#copy-code");l.value=c}function debounce(e,t){var n=(new Date).getTime()-1e3*t-1;return function(){var o=(new Date).getTime();return o-n<1e3*t?void console.log("You should wait"):(n=o,console.log(o),void e(o))}}showCalendar();for(var elems=document.querySelectorAll("form input[type=checkbox], form input[type=text], form select"),i=0;i<elems.length;i++)"text"===elems[i].type?elems[i].addEventListener("input",showCalendar):"checkbox"===elems[i].type||"select"===elems[i].tagName.toLowerCase()?elems[i].addEventListener("change",showCalendar):console.error(elems[i]);var textarea=document.querySelector(".copy-code textarea");textarea.addEventListener("click",function(){this.select()});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsic2hvd0NhbGVuZGFyIiwiaWQiLCJzaG93Q29udHJvbHMiLCJhbGxvd0FkZEV2ZW50cyIsImFsbG93UmVtb3ZlRXZlbnRzIiwiY2xhc3NOYW1lIiwidGl0bGUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJjaGVja2VkIiwiY2FsZW5kYXJTaG93IiwicXVlcnlTZWxlY3RvciIsInJlbW92ZSIsImRpdiIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJDYWxlbmRhciIsImVsIiwicnVuIiwidGV4dCIsImNvcHkiLCJkZWJvdW5jZSIsImZ1bmMiLCJ3YWl0IiwibGFzdFRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsIm5vdyIsImNvbnNvbGUiLCJsb2ciLCJlbGVtcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwibGVuZ3RoIiwidHlwZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJlcnJvciIsInRleHRhcmVhIiwidGhpcyIsInNlbGVjdCJdLCJtYXBwaW5ncyI6IkFBQUEsWUF5QkEsU0FBU0EsZ0JBRVAsR0FBSUMsR0FBQUEsT0FBSUMsRUFBQUEsT0FBY0MsRUFBQUEsT0FBZ0JDLEVBQUFBLE9BQW1CQyxFQUFBQSxPQUFXQyxFQUFBQSxNQUVwRUwsR0FBS00sU0FBU0MsZUFBZSxlQUFlQyxPQUFTLE1BQ3JEUCxFQUFlSyxTQUFTQyxlQUFlLGVBQWVFLFFBQ3REUCxFQUFpQkksU0FBU0MsZUFBZSxjQUFjRSxRQUN2RE4sRUFBb0JHLFNBQVNDLGVBQWUsaUJBQWlCRSxRQUM3REwsRUFBWUUsU0FBU0MsZUFBZSxXQUFXQyxPQUFTLEdBRXhESCxFQUFRQyxTQUFTQyxlQUFlLFNBQVNDLE9BQVMsRUFLbEQsSUFBSUUsR0FBZUosU0FBU0ssY0FBYyxpQkFDdENELElBQ0ZBLEVBQWFFLFFBR2YsSUFBSUMsR0FBTVAsU0FBU1EsY0FBYyxNQUNqQ0QsR0FBSVQsVUFBWSxnQkFDaEJTLEVBQUliLEdBQUtBLEVBQ1RNLFNBQVNTLEtBQUtDLFlBQVlILEdBRTFCLEdBQUlJLFdBQ0ZDLEdBQUksSUFBTWxCLEVBQ1ZDLGFBQWNBLEVBQ2RDLGVBQWdCQSxFQUNoQkMsa0JBQW1CQSxFQUNuQkMsVUFBV0EsRUFDWEMsTUFBT0EsSUFDTmMsS0FHSCxJQUFJQyxHQUFBQSwrcUJBY1dwQixFQWRYLHdGQWtCZUEsRUFsQmYsNkJBbUJrQkMsRUFuQmxCLDhCQW9Cb0JDLEVBcEJwQixpQ0FxQnVCQyxFQXJCdkIsMEJBc0JnQkMsRUF0QmhCLHVCQXVCWUMsRUF2QlosaURBNkJBZ0IsRUFBT2YsU0FBU0ssY0FBYyxhQUVsQ1UsR0FBS2IsTUFBUVksRUFHZixRQUFTRSxVQUFTQyxFQUFNQyxHQUN0QixHQUFJQyxJQUFXLEdBQUlDLE9BQU9DLFVBQW1CLElBQVBILEVBQWMsQ0FFcEQsT0FBTyxZQUNKLEdBQUlJLElBQU0sR0FBSUYsT0FBT0MsU0FDckIsT0FBR0MsR0FBTUgsRUFBZ0IsSUFBTEQsTUFDbEJLLFNBQVFDLElBQUksb0JBSWRMLEVBQVdHLEVBRVhDLFFBQVFDLElBQUlGLE9BQ1pMLEdBQUtLLEtBeEdWN0IsY0FLQSxLQUFLLEdBRkRnQyxPQUFRekIsU0FBUzBCLGlCQUFpQixpRUFFN0JDLEVBQUksRUFBR0EsRUFBSUYsTUFBTUcsT0FBUUQsSUFDVixTQUFsQkYsTUFBTUUsR0FBR0UsS0FDWEosTUFBTUUsR0FBR0csaUJBQWlCLFFBQVNyQyxjQUVSLGFBQWxCZ0MsTUFBTUUsR0FBR0UsTUFBMEQsV0FBbkNKLE1BQU1FLEdBQUdJLFFBQVFDLGNBQzFEUCxNQUFNRSxHQUFHRyxpQkFBaUIsU0FBVXJDLGNBR3BDOEIsUUFBUVUsTUFBTVIsTUFBTUUsR0FJeEIsSUFBSU8sVUFBV2xDLFNBQVNLLGNBQWMsc0JBQ3RDNkIsVUFBU0osaUJBQWlCLFFBQVMsV0FDakNLLEtBQUtDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB2YXIgdXJsID0gJ2h0dHBzOi8vY2RuLnJhd2dpdC5jb20vSGFwcHlDb2RlSGVyZS9qcy0tYmFzZS1jb3Vyc2UvMDIvMDIvaHQvSGFwcHlDb2RlSGVyZS90YXNrcy9jYWxlbmRhci9idWlsZFJhd0dpdC9pbmRleC5odG1sJztcclxuLy8gdmFyIG5ld1VybCA9ICcnO1xyXG5cclxuc2hvd0NhbGVuZGFyKCk7XHJcblxyXG5cclxudmFyIGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybSBpbnB1dFt0eXBlPWNoZWNrYm94XSwgZm9ybSBpbnB1dFt0eXBlPXRleHRdLCBmb3JtIHNlbGVjdCcpO1xyXG5cclxuZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7IGkrKykge1xyXG4gIGlmIChlbGVtc1tpXS50eXBlID09PSAndGV4dCcpIHtcclxuICAgIGVsZW1zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgc2hvd0NhbGVuZGFyKTtcclxuXHJcbiAgfSBlbHNlIGlmIChlbGVtc1tpXS50eXBlID09PSAnY2hlY2tib3gnIHx8IGVsZW1zW2ldLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcclxuICAgIGVsZW1zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHNob3dDYWxlbmRhcik7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVsZW1zW2ldKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciB0ZXh0YXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3B5LWNvZGUgdGV4dGFyZWEnKTtcclxudGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICB0aGlzLnNlbGVjdCgpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNob3dDYWxlbmRhcigpIHtcclxuXHJcbiAgbGV0IGlkLCBzaG93Q29udHJvbHMsIGFsbG93QWRkRXZlbnRzLCBhbGxvd1JlbW92ZUV2ZW50cywgY2xhc3NOYW1lLCB0aXRsZTtcclxuXHJcbiAgaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsZW5kYXItaWQnKS52YWx1ZSB8fCAnMTIzJztcclxuICBzaG93Q29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhbmdlLWRhdGUnKS5jaGVja2VkO1xyXG4gIGFsbG93QWRkRXZlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1ldmVudHMnKS5jaGVja2VkO1xyXG4gIGFsbG93UmVtb3ZlRXZlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbGV0ZS1ldmVudHMnKS5jaGVja2VkO1xyXG4gIGNsYXNzTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGFzc2VzJykudmFsdWUgfHwgJyc7XHJcblxyXG4gIHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlJykudmFsdWUgfHwgJyc7XHJcblxyXG4gIC8vIG5ld1VybCA9IGAke3VybH0/aWQ9JHtpZH0mc2hvd0NvbnRyb2xzPSR7c2hvd0NvbnRyb2xzfSZhbGxvd0FkZEV2ZW50cz0ke2FsbG93QWRkRXZlbnRzfSZhbGxvd1JlbW92ZUV2ZW50cz0ke2FsbG93UmVtb3ZlRXZlbnRzfSZjbGFzc05hbWU9JHtjbGFzc05hbWV9JnRpdGxlPSR7dGl0bGV9YDtcclxuXHJcblxyXG4gIHZhciBjYWxlbmRhclNob3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXItc2hvdycpO1xyXG4gIGlmIChjYWxlbmRhclNob3cpIHtcclxuICAgIGNhbGVuZGFyU2hvdy5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBkaXYuY2xhc3NOYW1lID0gJ2NhbGVuZGFyLXNob3cnO1xyXG4gIGRpdi5pZCA9IGlkO1xyXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgbmV3IENhbGVuZGFyKHtcclxuICAgIGVsOiAnIycgKyBpZCxcclxuICAgIHNob3dDb250cm9sczogc2hvd0NvbnRyb2xzLFxyXG4gICAgYWxsb3dBZGRFdmVudHM6IGFsbG93QWRkRXZlbnRzLFxyXG4gICAgYWxsb3dSZW1vdmVFdmVudHM6IGFsbG93UmVtb3ZlRXZlbnRzLFxyXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXHJcbiAgICB0aXRsZTogdGl0bGVcclxuICB9KS5ydW4oKTtcclxuXHJcblxyXG4gIHZhciB0ZXh0ID0gYFxyXG4gIDwhLS0gQm9vdHN0cmFwIC0tPlxyXG4gIDxsaW5rIGhyZWY9XCJodHRwczovL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuNy9jc3MvYm9vdHN0cmFwLm1pbi5jc3NcIiByZWw9XCJzdHlsZXNoZWV0XCIgaW50ZWdyaXR5PVwic2hhMzg0LUJWWWlpU0lGZUsxZEdtSlJBa3ljdUhBSFJnMzJPbVVjd3c3b24zUllkZzRWYStQbVNUc3ovSzY4dmJkRWpoNHVcIiBjcm9zc29yaWdpbj1cImFub255bW91c1wiPlxyXG5cclxuICA8IS0tIFN0eWxlcyAtLT5cclxuICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vcmF3Z2l0LmNvbS9IYXBweUNvZGVIZXJlL2pzLS1iYXNlLWNvdXJzZS8wMi8wMi9odC9IYXBweUNvZGVIZXJlL3Rhc2tzL2NhbGVuZGFyL2Rpc3QvY3NzL21haW4uY3NzXCI+XHJcblxyXG4gIDwhLS0gQ2FsZW5kYXIgd2lkZ2V0IC0tPlxyXG4gIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9yYXdnaXQuY29tL0hhcHB5Q29kZUhlcmUvanMtLWJhc2UtY291cnNlLzAyLzAyL2h0L0hhcHB5Q29kZUhlcmUvdGFza3MvY2FsZW5kYXIvZGlzdC9qcy9tYWluLmpzXCI+PC9zY3JpcHQ+XHJcblxyXG4gIDwhLS0gQ2FsZW5kYXIgc2V0dGluZ3MgLS0+XHJcbiAgPHNjcmlwdD5cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBkaXYuaWQgPSAke2lkfTtcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICAgbmV3IENhbGVuZGFyKHtcclxuICAgICAgICBlbDogJyMnICsgJyR7aWR9JyxcclxuICAgICAgICBzaG93Q29udHJvbHM6ICR7c2hvd0NvbnRyb2xzfSxcclxuICAgICAgICBhbGxvd0FkZEV2ZW50czogJHthbGxvd0FkZEV2ZW50c30sXHJcbiAgICAgICAgYWxsb3dSZW1vdmVFdmVudHM6ICR7YWxsb3dSZW1vdmVFdmVudHN9LFxyXG4gICAgICAgIGNsYXNzTmFtZTogJyR7Y2xhc3NOYW1lfScsXHJcbiAgICAgICAgdGl0bGU6ICcke3RpdGxlfSdcclxuICAgICAgfSkucnVuKCk7XHJcbiAgICB9KSgpO1xyXG4gIDwvc2NyaXB0PlxyXG4gIGBcclxuXHJcbiAgdmFyIGNvcHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29weS1jb2RlJyk7XHJcbiAgLy8gY29weS5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIGNvcHkudmFsdWUgPSB0ZXh0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XHJcblx0XHR2YXIgbGFzdFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHdhaXQgKiAxMDAwIC0gMTsgLy8gYWN0aXZlIGZpcnN0IHRpbWVcclxuXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgIGlmKG5vdyAtIGxhc3RUaW1lIDwgd2FpdCoxMDAwKSB7XHJcbiAgICAgICBjb25zb2xlLmxvZygnWW91IHNob3VsZCB3YWl0Jyk7XHJcbiAgICAgICByZXR1cm47XHJcbiAgICAgfVxyXG5cclxuICAgICBsYXN0VGltZSA9IG5vdztcclxuXHJcbiAgICAgY29uc29sZS5sb2cobm93KTtcclxuICAgICBmdW5jKG5vdyk7XHJcbiAgICB9XHJcbn0iXX0=
