CREATE TRIGGER on_auth_insert_users AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION insert_user_in_public_table_for_new_user();


