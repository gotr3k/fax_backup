import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAzurirajPredmetComponent } from './admin-azuriraj-predmet/admin-azuriraj-predmet.component';
import { AdminAzurirajStudentaComponent } from './admin-azuriraj-studenta/admin-azuriraj-studenta.component';
import { AdminAzurirajZaposlenogComponent } from './admin-azuriraj-zaposlenog/admin-azuriraj-zaposlenog.component';
import { AdminDodajPredmetComponent } from './admin-dodaj-predmet/admin-dodaj-predmet.component';
import { AdminDodajStudentaComponent } from './admin-dodaj-studenta/admin-dodaj-studenta.component';
import { AdminDodajZaposlenogComponent } from './admin-dodaj-zaposlenog/admin-dodaj-zaposlenog.component';
import { AdminPredmetiComponent } from './admin-predmeti/admin-predmeti.component';
import { AdminStudentiComponent } from './admin-studenti/admin-studenti.component';
import { AdminZaposleniComponent } from './admin-zaposleni/admin-zaposleni.component';
import { AppComponent } from './app.component';
import { AzurirajObavestenjeComponent } from './azuriraj-obavestenje/azuriraj-obavestenje.component';
import { DodajObavestenjeComponent } from './dodaj-obavestenje/dodaj-obavestenje.component';
import { IstrazivanjaComponent } from './istrazivanja/istrazivanja.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { MasterStudijeComponent } from './master-studije/master-studije.component';
import { NaucniProjektiComponent } from './naucni-projekti/naucni-projekti.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { OpcijeComponent } from './opcije/opcije.component';
import { OsobaComponent } from './osoba/osoba.component';
import { OstaliComponent } from './ostali/ostali.component';
import { PlanAngazovanjaComponent } from './plan-angazovanja/plan-angazovanja.component';
import { PlanSlusanjaComponent } from './plan-slusanja/plan-slusanja.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProjektiComponent } from './projekti/projekti.component';
import { RegisterComponent } from './register/register.component';
import { RtiComponent } from './rti/rti.component';
import { SiComponent } from './si/si.component';
import { ZaposleniPredmetiComponent } from './zaposleni-predmeti/zaposleni-predmeti.component';
import { ZaposleniProfilComponent } from './zaposleni-profil/zaposleni-profil.component';
import { ZaposleniSpiskoviComponent } from './zaposleni-spiskovi/zaposleni-spiskovi.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';
import { ZaposleniPredmetComponent } from './zaposleni-predmet/zaposleni-predmet.component';
import { ZaposleniPredmetOComponent } from './zaposleni-predmet-o/zaposleni-predmet-o.component';
import { ZaposleniPredmetPredavanjaComponent } from './zaposleni-predmet-predavanja/zaposleni-predmet-predavanja.component';
import { ZaposleniPredmetVezbeComponent } from './zaposleni-predmet-vezbe/zaposleni-predmet-vezbe.component';
import { ZaposleniPredmetPitanjaComponent } from './zaposleni-predmet-pitanja/zaposleni-predmet-pitanja.component';
import { ZaposleniPredmetObavestenjaComponent } from './zaposleni-predmet-obavestenja/zaposleni-predmet-obavestenja.component';
import { ZaposleniPredmetLabComponent } from './zaposleni-predmet-lab/zaposleni-predmet-lab.component';
import { ZaposleniPredmetProjekatComponent } from './zaposleni-predmet-projekat/zaposleni-predmet-projekat.component';
import { ZaposleniAzurirajPredmetnoObavestenjeComponent } from './zaposleni-azuriraj-predmetno-obavestenje/zaposleni-azuriraj-predmetno-obavestenje.component';
import { ZaposleniDodajPredmetnoObavestenjeComponent } from './zaposleni-dodaj-predmetno-obavestenje/zaposleni-dodaj-predmetno-obavestenje.component';
import { PredmetObavestenjaComponent } from './predmet-obavestenja/predmet-obavestenja.component';
import { PredmetPredavanjaComponent } from './predmet-predavanja/predmet-predavanja.component';
import { PredmetVezbeComponent } from './predmet-vezbe/predmet-vezbe.component';
import { PredmetPitanjaComponent } from './predmet-pitanja/predmet-pitanja.component';
import { PredmetLabComponent } from './predmet-lab/predmet-lab.component';
import { PredmetProjekatComponent } from './predmet-projekat/predmet-projekat.component';
import { PredmetInformacijeComponent } from './predmet-informacije/predmet-informacije.component';
import { ZaposleniDodajSpisakComponent } from './zaposleni-dodaj-spisak/zaposleni-dodaj-spisak.component';
import { ZaposleniAzurirajSpisakComponent } from './zaposleni-azuriraj-spisak/zaposleni-azuriraj-spisak.component';
import { PredmetSpisakComponent } from './predmet-spisak/predmet-spisak.component';
import { OsnovneStudijeComponent } from './osnovne-studije/osnovne-studije.component';
import { NaukaComponent } from './nauka/nauka.component';

const routes: Routes = [
  {path:'', component:PocetnaComponent},
  {path:'zaposleni', component:ZaposleniComponent, pathMatch:'full'},
  {path:'kontakt', component:KontaktComponent, pathMatch:'full'},
  {path:'projekti', component:ProjektiComponent, pathMatch:'full'},
  {path:'obavestenja', component:ObavestenjaComponent, pathMatch:'full'},
  {path:'rti', component:RtiComponent, pathMatch:'full'},
  {path:'si', component:SiComponent, pathMatch:'full'},
  {path:'ostali_odseci', component:OstaliComponent, pathMatch:'full'},
  {path:'istrazivanja', component:IstrazivanjaComponent, pathMatch:'full'},
  {path:'naucni_projekti', component:NaucniProjektiComponent, pathMatch:'full'},
  {path:'master', component:MasterStudijeComponent, pathMatch:'full'},
  {path:'registracija', component:RegisterComponent, pathMatch:'full'},
  {path:'opcije',component:OpcijeComponent, pathMatch:'full'},
  {path:'adminStudenti',component:AdminStudentiComponent, pathMatch:'full'},
  {path:'adminZaposleni',component:AdminZaposleniComponent, pathMatch:'full'},
  {path:'adminPredmeti',component:AdminPredmetiComponent, pathMatch:'full'},
  {path:'adminAzurirajStudenta',component:AdminAzurirajStudentaComponent, pathMatch:'full'},
  {path:'adminDodajStudenta',component:AdminDodajStudentaComponent, pathMatch:'full'},
  {path:'adminAzurirajZaposlenog',component:AdminAzurirajZaposlenogComponent, pathMatch:'full'},
  {path:'adminDodajZaposlenog',component:AdminDodajZaposlenogComponent, pathMatch:'full'},
  {path:'adminAzurirajPredmet',component:AdminAzurirajPredmetComponent, pathMatch:'full'},
  {path:'adminDodajPredmet',component:AdminDodajPredmetComponent, pathMatch:'full'},
  {path:'planAngazovanja',component:PlanAngazovanjaComponent, pathMatch:'full'},
  {path:'planSlusanja',component:PlanSlusanjaComponent, pathMatch:'full'},
  {path:'osoba',component:OsobaComponent, pathMatch:'full'},
  {path:'azurirajObavestenje',component:AzurirajObavestenjeComponent, pathMatch:'full'},
  {path:'dodajObavestenje',component:DodajObavestenjeComponent, pathMatch:'full'},
  {path:'zaposleniProfil',component:ZaposleniProfilComponent, pathMatch:'full'},
  {path:'zaposleniPredmeti',component:ZaposleniPredmetiComponent, pathMatch:'full'},
  {path:'zaposleniSpiskovi',component:ZaposleniSpiskoviComponent, pathMatch:'full'},
  {path:'zaposleniPredmet', component:ZaposleniPredmetComponent,  pathMatch:'full' },
  {path:'zaposleniPredmetO', component:ZaposleniPredmetOComponent,  pathMatch:'full' },
  {path:'zaposleniPredmetPredavanja', component:ZaposleniPredmetPredavanjaComponent,  pathMatch:'full' },
  {path:'zaposleniPredmetVezbe', component:ZaposleniPredmetVezbeComponent,  pathMatch:'full' },
  {path:'zaposleniPredmetPitanja', component:ZaposleniPredmetPitanjaComponent,  pathMatch:'full' },
  {path:'zaposleniPredmetObavestenja', component:ZaposleniPredmetObavestenjaComponent,  pathMatch:'full' },
  {path:'zaposleniPredmetLab', component:ZaposleniPredmetLabComponent,  pathMatch:'full' },
  {path:'zaposleniPredmetProjekat', component:ZaposleniPredmetProjekatComponent,  pathMatch:'full' },
  {path:'zaposleniAzurirajPredmetnoObavestenje', component:ZaposleniAzurirajPredmetnoObavestenjeComponent,  pathMatch:'full' },
  {path:'zaposleniDodajPredmetnoObavestenje', component:ZaposleniDodajPredmetnoObavestenjeComponent,  pathMatch:'full' },
  {path:'predmetObavestenja', component:PredmetObavestenjaComponent,  pathMatch:'full' },
  {path:'predmetPredavanja', component:PredmetPredavanjaComponent,  pathMatch:'full' },
  {path:'predmetVezbe', component:PredmetVezbeComponent,  pathMatch:'full' },
  {path:'predmetPitanja', component:PredmetPitanjaComponent,  pathMatch:'full' },
  {path:'predmetLab', component:PredmetLabComponent,  pathMatch:'full' },
  {path:'predmetProjekat', component:PredmetProjekatComponent,  pathMatch:'full' },
  {path:'predmetSpisak', component:PredmetSpisakComponent,  pathMatch:'full' },
  {path:'predmetInformacije', component:PredmetInformacijeComponent,  pathMatch:'full' },
  {path:'zaposleniDodajSpisak', component:ZaposleniDodajSpisakComponent,  pathMatch:'full' },
  {path:'zaposleniAzurirajSpisak', component:ZaposleniAzurirajSpisakComponent,  pathMatch:'full' },
  {path:'osnovneStudije', component:OsnovneStudijeComponent,  pathMatch:'full' },
  {path:'nauka', component:NaukaComponent,  pathMatch:'full' },
  {path:'**', component:PocetnaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
