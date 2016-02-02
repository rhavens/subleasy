# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160202024015) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "offers", force: :cascade do |t|
    t.string   "image"
    t.string   "line1"
    t.string   "line2"
    t.string   "city"
    t.string   "state"
    t.integer  "zip"
    t.integer  "rent"
    t.date     "start_date"
    t.date     "end_date"
    t.boolean  "water"
    t.boolean  "electric"
    t.boolean  "gas"
    t.boolean  "heat"
    t.boolean  "internet"
    t.boolean  "washdry"
    t.boolean  "aircond"
    t.boolean  "handicap"
    t.boolean  "parking"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.integer  "interested"
    t.integer  "user_id"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "school",      default: "Unknown"
    t.string   "description"
  end

  add_index "offers", ["user_id"], name: "index_offers_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "offers_id"
    t.string   "school"
    t.string   "name"
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["offers_id"], name: "index_users_on_offers_id", using: :btree
  add_index "users", ["provider"], name: "index_users_on_provider", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid"], name: "index_users_on_uid", using: :btree

  add_foreign_key "offers", "users"
end
