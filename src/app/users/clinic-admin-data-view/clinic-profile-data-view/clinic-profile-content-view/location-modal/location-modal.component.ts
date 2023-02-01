import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']
})
export class LocationModalComponent implements OnInit {


  @ViewChild(GoogleMap)
  public map!: GoogleMap;

  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDefaultUI: false,
    fullscreenControl: true,
    disableDoubleClickZoom: false,
    mapTypeId: 'hybrid',
    // maxZoom:this.maxZoom,
    // minZoom:this.minZoom,
  };

  latitude!: any;
  longitude!: any;

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];


  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.pop()
    this.markerPositions.push(event.latLng.toJSON());
    this.latitude = this.markerPositions[0].lat;
    this.longitude = this.markerPositions[0].lng;
    console.log(this.markerPositions)
  }

  apiLoaded: Observable<boolean>;

  public locationForm!: FormGroup;
  public dialogStatus!: string
  public selectedLocation: any;

  id: any
  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public translate: TranslateService,
    private router: Router,
    httpClient: HttpClient,
    private ngZone: NgZone
  ) {
    var numb = this.router.url.match(/\d/g);
    this.id = numb?.join('')
    console.log(this.id)
    this.locationForm = this._fb.group({
      name: ['', Validators.required],
    });
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?AIzaSyD4bzBLXDJY05CYlzgXWuF9h4EoL91LRBg&libraries=places', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  @ViewChild("placesRef") placesRef!: GooglePlaceDirective;

  public handleAddressChange(address: Address) {
    console.log(address)
    this.markerPositions.pop();
    this.markerPositions.push({
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
    })
    this.center = {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
    };
    // Do some stuff
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      if (this.markerPositions) {
        this.markerPositions.pop();
      }
      this.markerPositions.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })

      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    if (this.config.data) {
      this.dialogStatus = this.config.data.status;
      this.selectedLocation = this.config.data.selectedLocation
      console.log(this.selectedLocation)
      if (this.dialogStatus === 'Edit') {
        this.locationForm.get('name')?.setValue(this.selectedLocation.name);
      }
    }
  }

  saveLocation(location: any) {
    let modal = {
      name: location.name,
      clinicId: this.id,
      longitude: this.longitude,
      latitude: this.latitude
    }
    this._dialogRef.close(modal)
  }

  closeDialog() {
    this._dialogRef.close(null)
  }
}
