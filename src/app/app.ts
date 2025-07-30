import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  settings: {
    theme: string;
    notifications: boolean;
  };
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'immutable-data';

  // --- Immutable Data Example ---
  // This object is treated as immutable. Any "change" creates a new object.
  public immutableUser: User = {
    id: 2,
    name: 'Bob',
    settings: {
      theme: 'dark',
      notifications: false,
    },
  };

  // --- Mutable Data Example ---
  // This object can be directly modified.
  public mutableUser: User = {
    id: 1,
    name: 'Alice',
    settings: {
      theme: 'light',
      notifications: true,
    },
  };

  /**
   * Demonstrates immutable behavior by creating a new object with the updated name.
   * This ensures Angular's change detection (especially OnPush) easily detects the change.
   */
  public changeImmutableUserName(): void {
    this.immutableUser = {
      ...this.immutableUser, // Copy existing properties
      name: 'Robert', // Override the name
    };
    console.log('Immutable user name changed:', this.immutableUser);
  }

  /**
   * Demonstrates immutable behavior for nested objects.
   * A new 'settings' object is created, and then a new 'immutableUser' object
   * is created with the new 'settings' reference.
   */
  public changeImmutableUserSettings(): void {
    // First, create a new settings object with the desired changes
    const newSettings = {
      ...this.immutableUser.settings, // Copy existing settings properties
      notifications: !this.immutableUser.settings.notifications, // Toggle notifications
      theme: this.immutableUser.settings.theme === 'dark' ? 'light' : 'dark', // Toggle theme
    };

    // Then, create a new user object with the new settings object
    this.immutableUser = {
      ...this.immutableUser, // Copy existing user properties
      settings: newSettings, // Assign the new settings object
    };
    console.log('Immutable user settings changed:', this.immutableUser);
  }

  /**
   * Demonstrates mutable behavior by directly changing a property of the object.
   */
  public changeMutableUserName(): void {
    this.mutableUser.name = 'Alice Smith';
    console.log('Mutable user name changed:', this.mutableUser);
  }

  /**
   * Demonstrates mutable behavior by directly changing a nested property.
   * Angular's default change detection (OnPush) might not detect this change
   * if only the nested property is modified without changing the reference of the parent object.
   */
  public changeMutableUserSettings(): void {
    this.mutableUser.settings.notifications =
      !this.mutableUser.settings.notifications;
    this.mutableUser.settings.theme =
      this.mutableUser.settings.theme === 'light' ? 'dark' : 'light';
    console.log('Mutable user settings changed:', this.mutableUser);
    // To ensure Angular detects this change if using OnPush strategy,
    // you might need to reassign the parent object or use ChangeDetectorRef.
    // E.g., this.mutableUser = { ...this.mutableUser };
  }
}
