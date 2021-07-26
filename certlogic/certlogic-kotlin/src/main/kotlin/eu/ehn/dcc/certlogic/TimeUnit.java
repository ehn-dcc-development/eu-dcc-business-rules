package eu.ehn.dcc.certlogic;

public enum TimeUnit {

    year, month, day, hour;

    public static boolean isTimeUnitName(String name) {
        try {
            valueOf(name);
            return true;
        } catch (IllegalArgumentException iae) {
            return false;
        }
    }

}
