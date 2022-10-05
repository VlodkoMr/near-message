// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class PrivateChat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PrivateChat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PrivateChat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PrivateChat", id.toString(), this);
    }
  }

  static load(id: string): PrivateChat | null {
    return changetype<PrivateChat | null>(store.get("PrivateChat", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get last_message(): string {
    let value = this.get("last_message");
    return value!.toString();
  }

  set last_message(value: string) {
    this.set("last_message", Value.fromString(value));
  }

  get is_removed(): boolean {
    let value = this.get("is_removed");
    return value!.toBoolean();
  }

  set is_removed(value: boolean) {
    this.set("is_removed", Value.fromBoolean(value));
  }

  get updated_at(): i32 {
    let value = this.get("updated_at");
    return value!.toI32();
  }

  set updated_at(value: i32) {
    this.set("updated_at", Value.fromI32(value));
  }
}

export class PrivateMessage extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PrivateMessage entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PrivateMessage must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PrivateMessage", id.toString(), this);
    }
  }

  static load(id: string): PrivateMessage | null {
    return changetype<PrivateMessage | null>(store.get("PrivateMessage", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get chat_id(): string {
    let value = this.get("chat_id");
    return value!.toString();
  }

  set chat_id(value: string) {
    this.set("chat_id", Value.fromString(value));
  }

  get from_user(): string {
    let value = this.get("from_user");
    return value!.toString();
  }

  set from_user(value: string) {
    this.set("from_user", Value.fromString(value));
  }

  get to_user(): string {
    let value = this.get("to_user");
    return value!.toString();
  }

  set to_user(value: string) {
    this.set("to_user", Value.fromString(value));
  }

  get from_address(): string {
    let value = this.get("from_address");
    return value!.toString();
  }

  set from_address(value: string) {
    this.set("from_address", Value.fromString(value));
  }

  get to_address(): string {
    let value = this.get("to_address");
    return value!.toString();
  }

  set to_address(value: string) {
    this.set("to_address", Value.fromString(value));
  }

  get reply_to_message(): string | null {
    let value = this.get("reply_to_message");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set reply_to_message(value: string | null) {
    if (!value) {
      this.unset("reply_to_message");
    } else {
      this.set("reply_to_message", Value.fromString(<string>value));
    }
  }

  get text(): string {
    let value = this.get("text");
    return value!.toString();
  }

  set text(value: string) {
    this.set("text", Value.fromString(value));
  }

  get created_at(): i32 {
    let value = this.get("created_at");
    return value!.toI32();
  }

  set created_at(value: i32) {
    this.set("created_at", Value.fromI32(value));
  }

  get tx_hash(): string {
    let value = this.get("tx_hash");
    return value!.toString();
  }

  set tx_hash(value: string) {
    this.set("tx_hash", Value.fromString(value));
  }

  get is_spam(): boolean {
    let value = this.get("is_spam");
    return value!.toBoolean();
  }

  set is_spam(value: boolean) {
    this.set("is_spam", Value.fromBoolean(value));
  }

  get is_removed(): boolean {
    let value = this.get("is_removed");
    return value!.toBoolean();
  }

  set is_removed(value: boolean) {
    this.set("is_removed", Value.fromBoolean(value));
  }

  get is_protected(): boolean {
    let value = this.get("is_protected");
    return value!.toBoolean();
  }

  set is_protected(value: boolean) {
    this.set("is_protected", Value.fromBoolean(value));
  }
}

export class RoomChat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save RoomChat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type RoomChat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("RoomChat", id.toString(), this);
    }
  }

  static load(id: string): RoomChat | null {
    return changetype<RoomChat | null>(store.get("RoomChat", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get last_message(): string {
    let value = this.get("last_message");
    return value!.toString();
  }

  set last_message(value: string) {
    this.set("last_message", Value.fromString(value));
  }

  get is_removed(): boolean {
    let value = this.get("is_removed");
    return value!.toBoolean();
  }

  set is_removed(value: boolean) {
    this.set("is_removed", Value.fromBoolean(value));
  }

  get updated_at(): i32 {
    let value = this.get("updated_at");
    return value!.toI32();
  }

  set updated_at(value: i32) {
    this.set("updated_at", Value.fromI32(value));
  }
}

export class RoomMessage extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save RoomMessage entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type RoomMessage must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("RoomMessage", id.toString(), this);
    }
  }

  static load(id: string): RoomMessage | null {
    return changetype<RoomMessage | null>(store.get("RoomMessage", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from_user(): string {
    let value = this.get("from_user");
    return value!.toString();
  }

  set from_user(value: string) {
    this.set("from_user", Value.fromString(value));
  }

  get from_address(): string {
    let value = this.get("from_address");
    return value!.toString();
  }

  set from_address(value: string) {
    this.set("from_address", Value.fromString(value));
  }

  get reply_to_message(): string | null {
    let value = this.get("reply_to_message");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set reply_to_message(value: string | null) {
    if (!value) {
      this.unset("reply_to_message");
    } else {
      this.set("reply_to_message", Value.fromString(<string>value));
    }
  }

  get room_id(): string {
    let value = this.get("room_id");
    return value!.toString();
  }

  set room_id(value: string) {
    this.set("room_id", Value.fromString(value));
  }

  get text(): string {
    let value = this.get("text");
    return value!.toString();
  }

  set text(value: string) {
    this.set("text", Value.fromString(value));
  }

  get created_at(): i32 {
    let value = this.get("created_at");
    return value!.toI32();
  }

  set created_at(value: i32) {
    this.set("created_at", Value.fromI32(value));
  }

  get tx_hash(): string {
    let value = this.get("tx_hash");
    return value!.toString();
  }

  set tx_hash(value: string) {
    this.set("tx_hash", Value.fromString(value));
  }

  get is_spam(): boolean {
    let value = this.get("is_spam");
    return value!.toBoolean();
  }

  set is_spam(value: boolean) {
    this.set("is_spam", Value.fromBoolean(value));
  }

  get is_removed(): boolean {
    let value = this.get("is_removed");
    return value!.toBoolean();
  }

  set is_removed(value: boolean) {
    this.set("is_removed", Value.fromBoolean(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get media(): string | null {
    let value = this.get("media");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set media(value: string | null) {
    if (!value) {
      this.unset("media");
    } else {
      this.set("media", Value.fromString(<string>value));
    }
  }
}
