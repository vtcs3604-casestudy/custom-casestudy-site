import csv

input_file = 'devTest.csv'
output_file = 'test3_batch_invite.csv'

# Set up csv file for reading the PIDs
with open(input_file, 'r', newline='') as csvfile:
    pid_reader = csv.reader(csvfile)

    # Set up csv file for writing the converted emails
    with open(output_file, 'w', newline='') as outfile:
        email_writer = csv.writer(outfile)

        # Setting up template configuration
        email_writer.writerow(["version:v1.0"])
        email_writer.writerow([
            "Email address to invite [inviteeEmail] Required",
            "Redirection url [inviteRedirectURL] Required",
            "Send invitation message (true or false) [sendEmail]",
            "Customized invitation message [customizedMessageBody]"
        ])

        for row in pid_reader:
            if(len(row) == 1): # Skips spaces
                # Convert PID to Email
                email_writer.writerow([
                    row[0] + "@vt.edu",
                    "https://myapplications.microsoft.com",
                    "TRUE",
                    "You are invited to the CS3604 Digital Library!"
                ])
                
                # print("PID: " + row[0])
                # print("Converted Email: " + row[0] + "@vt.edu")