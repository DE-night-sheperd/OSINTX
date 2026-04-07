import sys
import json
import phonenumbers
from phonenumbers import carrier, geocoder, timezone

def analyze_phone(phone_number):
    try:
        # Parse number
        parsed_num = phonenumbers.parse(phone_number, None)
        
        # Validate
        if not phonenumbers.is_valid_number(parsed_num):
            return {"error": "Invalid phone number"}

        # Basic Info
        results = {
            "formatted": phonenumbers.format_number(parsed_num, phonenumbers.PhoneNumberFormat.INTERNATIONAL),
            "country_code": parsed_num.country_code,
            "national_number": parsed_num.national_number,
            "location": geocoder.description_for_number(parsed_num, "en"),
            "carrier": carrier.name_for_number(parsed_num, "en"),
            "timezones": timezone.time_zones_for_number(parsed_num),
            "is_valid": phonenumbers.is_valid_number(parsed_num),
            "is_possible": phonenumbers.is_possible_number(parsed_num),
            "type": "Mobile" if phonenumbers.number_type(parsed_num) == 1 else "Fixed Line / Other"
        }
        
        # Real-world OSINT would include social media lookups, breach data, etc.
        # This is a baseline for a real-world tool.
        return results

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) > 1:
        number = sys.argv[1]
        print(json.dumps(analyze_phone(number)))
    else:
        print(json.dumps({"error": "No phone number provided"}))
