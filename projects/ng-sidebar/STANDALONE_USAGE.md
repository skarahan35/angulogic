# Standalone Components Usage Guide

Bu rehber, @angulogic/ng-sidebar paketinin standalone components yapısıyla nasıl kullanılacağını gösterir.

## Kurulum

```bash
npm install @angulogic/ng-sidebar
```

## Standalone Component Kullanımı

### 1. Ana Sidebar Component

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { NgSidebarComponent, SidebarModel } from '@angulogic/ng-sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgSidebarComponent],
  template: `
    <ng-sidebar [options]="sidebarModel"></ng-sidebar>
    <main>
      <h1>Ana İçerik</h1>
    </main>
  `
})
export class AppComponent {
  sidebarModel: SidebarModel = {
    bannerOptions: {
      title: 'Uygulamam',
      logo: 'assets/logo.png',
    },
    userOptions: {
      name: 'Kullanıcı Adı',
      avatar: 'assets/avatar.png',
    },
    sidebarData: [
      {
        title: 'Ana Menü',
        data: [
          { name: 'Dashboard', route: '/dashboard' },
          { name: 'Ayarlar', route: '/settings' },
        ],
      },
    ],
    options: {
      expand: true,
      theme: 'light',
    },
  };
}
```

### 2. Ayrı Componentler

```typescript
// custom.component.ts
import { Component } from '@angular/core';
import { 
  ThemeTogglerComponent, 
  TogglerDirective, 
  AlIconComponent 
} from '@angulogic/ng-sidebar';

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [ThemeTogglerComponent, TogglerDirective, AlIconComponent],
  template: `
    <button sidebarToggler>Temayı Değiştir</button>
    <al-theme-toggler></al-theme-toggler>
    <al-icon icon="assets/icon.svg"></al-icon>
  `
})
export class CustomComponent {
  // Component mantığı
}
```

### 3. NgModule ile Kullanım (Geriye Uyumluluk)

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSidebarComponent } from '@angulogic/ng-sidebar';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgSidebarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Özellikler

- ✅ Standalone components desteği
- ✅ Angular 17+ uyumluluğu
- ✅ Tree-shaking desteği
- ✅ Geriye uyumluluk (NgModule ile)
- ✅ TypeScript desteği
- ✅ Modern Angular mimarisi

## Avantajlar

1. **Daha küçük bundle boyutu**: Sadece kullandığınız componentler dahil edilir
2. **Daha iyi performans**: Tree-shaking sayesinde gereksiz kodlar bundle'a dahil edilmez
3. **Modern yaklaşım**: Angular'ın önerdiği standalone components mimarisi
4. **Kolay kullanım**: Module import etmeye gerek yok, direkt component import edebilirsiniz

## Geçiş Rehberi

Eski kullanımdan yeni kullanıma geçiş:

**Eski (v1.x):**
```typescript
import { NgSidebarModule } from '@angulogic/ng-sidebar';

@NgModule({
  imports: [NgSidebarModule]
})
```

**Yeni (v2.x):**
```typescript
import { NgSidebarComponent } from '@angulogic/ng-sidebar';

@Component({
  standalone: true,
  imports: [NgSidebarComponent]
})
```

## Desteklenen Angular Sürümleri

- Angular 17.0.0+
- Angular 18.0.0+
- Angular 19.0.0+ (gelecek sürümler) 