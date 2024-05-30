import { Database, Tables } from "@/database.types";

declare global {
  type DB = Database;
  type Dish = Tables<"dishes">;
  type Profile = Tables<"profiles">;
}
