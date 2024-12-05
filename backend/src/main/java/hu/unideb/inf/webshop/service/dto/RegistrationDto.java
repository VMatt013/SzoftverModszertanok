package hu.unideb.inf.webshop.service.dto;

import java.util.Date;
import java.util.Objects;

public class RegistrationDto {
    private String firstName;
    private String lastName;
    private String emailAddress;
    private String password;
    private Date birthDate;

    public RegistrationDto() {
    }

    public RegistrationDto(String firstName, String lastName, String emailAddress, String password, Date birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
        this.birthDate = birthDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RegistrationDto that = (RegistrationDto) o;
        return Objects.equals(emailAddress, that.emailAddress) && Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(emailAddress, password);
    }
}
