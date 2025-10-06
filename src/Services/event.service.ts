import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/Models/Evt';

@Injectable({
  providedIn: 'root'
})
export class EventService {

constructor(private Http:HttpClient){}
getAllEvent():Observable<Evt[]>
  {
    //any[] mich te5o table mil back w n7oto ba3ad fil frent bi table datasource  
    return this.Http.get<Evt[]>('http://localhost:3000/evt')
  }
  addEvent(Evt:Evt):Observable<void>
  {
    return this.Http.post<void>('http://localhost:3000/evt',Evt)
  }
 getEventById(id:String):Observable<Evt>
 {
   return this.Http.get< Evt>(`http://localhost:3000/evt/${id}`)
 }
 updateEvent(idcourant:String,Evt:Evt):Observable<void>
 {
   return this.Http.put<void>(`http://localhost:3000/evt/${idcourant}`,Evt)
 }
 deleteEvent(id:String):Observable<void>
{
  return this.Http.delete<void>(`http://localhost:3000/evt/${id}`)
}
}
